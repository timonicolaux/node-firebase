import { db } from '../firebase.js';

export const getAllAnimals = async (req, res) => {
  const animalsRef = db.collection('animals');
  const getAllAnimals = await animalsRef.get();
  try {
    const result = [];
    getAllAnimals.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      result.push(doc.data());
    });
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getOneAnimal = async (req, res) => {
  const { id } = req.params;
  const oneAnimalRef = db.collection('animals').doc(id);
  try {
    const result = [];
    const getOneAnimal = await oneAnimalRef.get();
    if (!getOneAnimal.exists) return res.status(400).send('Bad request');
    result.push(getOneAnimal.data());
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const createOneAnimal = async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  if (!name || !description) {
    return res.status(400).send('No name or description provided');
  }
  const animalRef = db.collection('animals').doc(name);
  try {
    await animalRef.set(
      {
        name: name,
        description: description,
      },
      { merge: true }
    );
    res.status(200).send('data posted');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const modifyOneAnimal = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (!id.length) {
    return res.status(400).send('No animal name provided');
  }
  const animalRef = db.collection('animals').doc(id);
  try {
    await animalRef.update(
      {
        name: name,
        description: description,
      },
      { merge: true }
    );
    res.status(200).send('data modified');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const deleteOneAnimal = async (req, res) => {
  const { id } = req.params;
  const animalRef = db.collection('animals').doc(id);
  try {
    await animalRef.delete();
    res.status(200).send('data deleted');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
