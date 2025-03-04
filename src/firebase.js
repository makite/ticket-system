// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsbWvdSxF4klrvD_dOV2XEEAWwG5fAcmA",
  authDomain: "ticket-system-7ac1c.firebaseapp.com",
  projectId: "ticket-system-7ac1c",
  storageBucket: "ticket-system-7ac1c.firebasestorage.app",
  messagingSenderId: "662332003644",
  appId: "1:662332003644:web:2f85ea8333575f50867a39",
  measurementId: "G-T4HG1SK7RK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
