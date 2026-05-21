import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMtJnR4Z6UMFjjBXvEVfP55vtsvWQn3fI",
  authDomain: "rajgandharv-mahila-bachat-gat.firebaseapp.com",
  projectId: "rajgandharv-mahila-bachat-gat",
  storageBucket: "rajgandharv-mahila-bachat-gat.firebasestorage.app",
  messagingSenderId: "1093981508022",
  appId: "1:1093981508022:web:7136ddf674304d6d5f117"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);