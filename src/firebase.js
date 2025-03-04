// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANKVHOI0ok-qVjKEHsQrqNx7FbQ7KUWqU",
  authDomain: "react-app-de7eb.firebaseapp.com",
  databaseURL: "https://react-app-de7eb-default-rtdb.firebaseio.com",
  projectId: "react-app-de7eb",
  storageBucket: "react-app-de7eb.firebasestorage.app",
  messagingSenderId: "344202878470",
  appId: "1:344202878470:web:9e97cdb12cd3ec9fd16d87",
  measurementId: "G-8SCCTL9KTP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
