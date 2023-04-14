import { db } from '../firebase.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const argon2 = require('argon2');

/* User Authentification controller */

// Create new user

export const createUser = async (req, res) => {
  const { pseudo, password } = req.body;
  if (!pseudo || !password) {
    return res.status(400).send('No pseudo or password provided');
  }
  const userRef = db.collection('auth').doc(pseudo);
  try {
    const hashedPassword = await argon2.hash(password);
    await userRef.set(
      {
        pseudo: pseudo,
        password: hashedPassword,
      },
      { merge: true }
    );
    res.status(200).send('data posted');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// Check if user exists

export const getUserAuth = async (pseudo, req, res) => {
  const userRef = db.collection('auth').doc(pseudo);
  try {
    const result = [];
    const getUserInfo = await userRef.get();
    if (getUserInfo.data()) {
      result.push(getUserInfo.data());
      return result;
    } else {
      return 'Wrong pseudo';
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// Login function

export const login = async (req, res) => {
  const { pseudo, password } = req.body;
  try {
    if (!pseudo || !password) {
      return res.status(400).send('No pseudo or password provided');
    }
    const verifyUser = await getUserAuth(pseudo);
    if (verifyUser === 'Wrong pseudo') {
      return res.status(400).send('Wrong pseudo');
    }
    const hashedPassword = verifyUser[0].password;
    const verifyPassword = await argon2.verify(hashedPassword, password);
    if (verifyPassword) {
      return res.status(200).send('login success');
    } else return res.status(400).send('wrong credentials');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
