import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIXuvrxnaXhgeP-GYCMrQfG3HX0oo4emw",
  authDomain: "safetyfood-6a1d3.firebaseapp.com",
  projectId: "safetyfood-6a1d3",
  storageBucket: "safetyfood-6a1d3.firebasestorage.app",
  messagingSenderId: "545674879718",
  appId: "1:545674879718:web:498ebe0e378f342f425127",
  measurementId: "G-299GZKB9MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
