import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOZJRqdk8x2LIWLMsDa-NBpnGfIziEvmQ",
  authDomain: "ips-used.firebaseapp.com",
  projectId: "ips-used",
  storageBucket: "ips-used.appspot.com",
  messagingSenderId: "884542490485",
  appId: "1:884542490485:web:42df6d15107e6b4181353c",
  measurementId: "G-WM94Y990SZ",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
