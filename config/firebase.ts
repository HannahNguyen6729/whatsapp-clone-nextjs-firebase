// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
