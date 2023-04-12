import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require('../.credentials.json');

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
