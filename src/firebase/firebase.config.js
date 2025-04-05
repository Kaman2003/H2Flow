import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDq2a_2dZs5wVwcLb8ENx8f_5eeuNLJPd8",
  authDomain: "h2flow-4ab96.firebaseapp.com",
  projectId: "h2flow-4ab96",
  storageBucket: "h2flow-4ab96.appspot.com",
  messagingSenderId: "213685018499",
  appId: "1:213685018499:web:f932223d0e3b203e00a0b6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

// Export all three
export { app,database };




