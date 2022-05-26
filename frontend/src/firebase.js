import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu7P0m47rtY5-GjIBfYjEW7kSr5qnlWhc",
  authDomain: "lifenft-8ecb5.firebaseapp.com",
  projectId: "lifenft-8ecb5",
  storageBucket: "lifenft-8ecb5.appspot.com",
  messagingSenderId: "659318632480",
  appId: "1:659318632480:web:8a67882a76ca1abb028c45",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
