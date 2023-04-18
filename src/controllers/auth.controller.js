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
  const verifyUser = await getUserAuth(pseudo);
  if (verifyUser !== 'Pseudo does not exist') {
    return res.status(400).send('Pseudo already exists');
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
      return 'Pseudo does not exist';
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
    if (verifyUser === 'Pseudo does not exist') {
      return res.status(403).send('Wrong pseudo');
    }
    const hashedPassword = verifyUser[0].password;
    const verifyPassword = await argon2.verify(hashedPassword, password);
    if (verifyPassword) {
      req.session.isAuth = true;
      console.log(req.session);
      console.log(req.session.id);
      return res.status(200).send('login success');
    } else return res.status(403).send('wrong credentials');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// Logout function

export const logout = async (req, res) => {
  const id = req.session.id;
  console.log(id);
  console.log(req.session);
  try {
    await req.session.destroy((err) => {
      if (err) throw err;
    });
    res.status(200).send('logout success');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
