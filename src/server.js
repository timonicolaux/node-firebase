const express = require('express');
const app = express();
const port = 4000;
const { db } = require('./firebase.js');
const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', async (req, res) => {
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
});

app.get('/:id', async (req, res) => {
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
});

app.post('/addanimal', async (req, res) => {
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
});

app.patch('/changeanimal/:id', async (req, res) => {
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
});

app.delete('/deleteanimal/:id', async (req, res) => {
  const { id } = req.params;
  const animalRef = db.collection('animals').doc(id);
  try {
    await animalRef.delete();
    res.status(200).send('data deleted');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
