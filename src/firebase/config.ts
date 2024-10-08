// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbRWeI86zoNatUwa9aPtvAEi3W9QS-Fsg",
  authDomain: "social-network-88b1e.firebaseapp.com",
  projectId: "social-network-88b1e",
  storageBucket: "social-network-88b1e.appspot.com",
  messagingSenderId: "210591487066",
  appId: "1:210591487066:web:e39e2382ccd9dd877d3463",
  measurementId: "G-VCJTJ3B9D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };