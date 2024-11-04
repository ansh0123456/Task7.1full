// Correct placement of imports at the top of the file
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDPk_HQcKSnekZSR_rXJYPItTeC1e--KNw",
  authDomain: "ptask-fe9c7.firebaseapp.com",
  projectId: "ptask-fe9c7",
  storageBucket: "ptask-fe9c7.firebasestorage.app",
  messagingSenderId: "945272098573",
  appId: "1:945272098573:web:010e693d3b1ef43d88ea44",
  measurementId: "G-055VFDNZ0E"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider(); 
provider.setCustomParameters({
  prompt: "select_account"
});

// Firebase Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore Database
export const db = getFirestore();

// Create user document from authentication
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return userDocRef;
};

// Auth functions
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export default db;
