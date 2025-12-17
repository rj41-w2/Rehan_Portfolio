import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Yahan Firebase Console se copy kiya hua config dalna hai
const firebaseConfig = {
  apiKey: "AIzaSyChAmzaI95WzQfbvSHn2ChDs6ywW_NAUD8", // <-- YAHAN APNI KEY DALEIN
  authDomain: "portfolio-guestbook1.firebaseapp.com",
  projectId: "portfolio-guestbook1",
  storageBucket: "portfolio-guestbook1.firebasestorage.app",
  messagingSenderId: "93117462208",
  appId: "1:93117462208:web:5d310329c728bac226df25"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);