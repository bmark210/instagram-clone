import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// import { seedDatabase } from '../seed';

const config = {
  // here your config
};
const firebase = initializeApp(config);
const firestore = getFirestore();
const auth = getAuth(firebase);

// seedDatabase(firestore);

export { firebase, firestore, auth };
