import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Yahan Firebase Console se copy kiya hua config dalna hai
const firebaseConfig = {
  apiKey: "AIzaSyCERc2jSbxhvGlTXp8F4lMCn2kdOAbkZ_4", // <-- YAHAN APNI KEY DALEIN
  authDomain: "portfolio-guestbook-44f3b.firebaseapp.com",
  projectId: "portfolio-guestbook-44f3b",
  storageBucket: "portfolio-guestbook-44f3b.firebasestorage.app",
  messagingSenderId: "587037877598",
  appId: "1:587037877598:web:57736856d6c5777cc49bcf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);