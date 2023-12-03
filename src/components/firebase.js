// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfNh31gIzli4jzOP9HZsbKUASrdJq17MI",
  authDomain: "snaptweet-69491.firebaseapp.com",
  projectId: "snaptweet-69491",
  storageBucket: "snaptweet-69491.appspot.com",
  messagingSenderId: "403224491062",
  appId: "1:403224491062:web:0a61fd9632b4f19d45d497",
  measurementId: "G-B58C2Y20QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);
