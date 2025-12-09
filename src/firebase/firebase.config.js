import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfr5dJrHcxMHh9EoLpDsGmJ8uBs1LOe6Q",
  authDomain: "localchefbazaar-c2f05.firebaseapp.com",
  projectId: "localchefbazaar-c2f05",
  storageBucket: "localchefbazaar-c2f05.firebasestorage.app",
  messagingSenderId: "43765617438",
  appId: "1:43765617438:web:3138127b14ce381b42af0f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
