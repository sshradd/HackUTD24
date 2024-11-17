


import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import Firestore
import 'firebase/firestore';  // Optional, depending on Firebase version you're using

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);  // Initialize Firestore instance

export { app, auth, firestore };  // Export firestore
