// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4aolb3MQhXkUe8OvgNQ6kfrPz8zSpEoc",
  authDomain: "whatsapp-clone-a49a5.firebaseapp.com",
  projectId: "whatsapp-clone-a49a5",
  storageBucket: "whatsapp-clone-a49a5.appspot.com",
  messagingSenderId: "460780539239",
  appId: "1:460780539239:web:3a9d17e7af57550ab9f3c2",
  measurementId: "G-W4PY0LB6W3",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
