// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app--mern.firebaseapp.com",
  projectId: "real-estate-app--mern",
  storageBucket: "real-estate-app--mern.firebasestorage.app",
  messagingSenderId: "53055216639",
  appId: "1:53055216639:web:63dcba799e2737f56665ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);