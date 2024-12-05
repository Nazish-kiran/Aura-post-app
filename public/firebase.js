import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query, orderBy,deleteDoc
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDGPrv_q7X3CeQnE0Jc9z1Mmwd_534md7Q",
  authDomain: "aura-posting-web.firebaseapp.com",
  projectId: "aura-posting-web",
  storageBucket: "aura-posting-web.firebasestorage.app",
  messagingSenderId: "587873322252",
  appId: "1:587873322252:web:392da24029b1099437b529",
  measurementId: "G-D7T33ND0WC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  query, orderBy,deleteDoc
};
