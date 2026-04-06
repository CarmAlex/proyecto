import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJjmE1pUhPv8eG8JJAW8SPAl5azOtxQ8Q",
  authDomain: "tc3005b-a01198988.firebaseapp.com",
  projectId: "tc3005b-a01198988",
  storageBucket: "tc3005b-a01198988.firebasestorage.app",
  messagingSenderId: "883008148934",
  appId: "1:883008148934:web:03f26a76fad2d87972cec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }