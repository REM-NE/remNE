// firebase-config.js ou um arquivo similar
import { initializeApp } from 'firebase/app';
// Se você for usar Authentication, importe o getAuth também
import { getAuth } from 'firebase/auth';
// import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBI9rbvcZu34L0l4XzXfHjtc4P47o3hPY",
  authDomain: "rem-ne.firebaseapp.com",
  projectId: "rem-ne",
  storageBucket: "rem-ne.firebasestorage.app",
  messagingSenderId: "580167204049",
  appId: "1:580167204049:web:098862fae527380cfe59f0",
  measurementId: "G-HE0N0N01L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { addDoc, collection, db, deleteDoc, doc, getDoc, getDocs, updateDoc };
// const analytics = getAnalytics(app);

// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
export const auth = getAuth(app);


