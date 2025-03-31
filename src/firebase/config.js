import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDq2a_2dZs5wVwcLb8ENx8f_5eeuNLJPd8",
  authDomain: "h2flow-4ab96.firebaseapp.com",
  projectId: "h2flow-4ab96",
  storageBucket: "h2flow-4ab96.firebasestorage.app",
  messagingSenderId: "213685018499",
  appId: "1:213685018499:web:f932223d0e3b203e00a0b6",
  measurementId: "G-V7MQ9ZMS6L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database }; // Added app to the exports
