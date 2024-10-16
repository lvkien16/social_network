// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Zym15fM60_mMyrJb755eqEPkv_GagO8",
  authDomain: "sleepant-social.firebaseapp.com",
  projectId: "sleepant-social",
  storageBucket: "sleepant-social.appspot.com",
  messagingSenderId: "128119442814",
  appId: "1:128119442814:web:06bcb195f664512698772f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };