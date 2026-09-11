import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD9u9plA9qSmLMxUJ9nQwGO7ZD66msxsCc",
  authDomain: "sm-project-a2947.firebaseapp.com",
  projectId: "sm-project-a2947",
  storageBucket: "sm-project-a2947.firebasestorage.app",
  messagingSenderId: "1000999464468",
  appId: "1:1000999464468:web:c16174f25875cdad41c101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);