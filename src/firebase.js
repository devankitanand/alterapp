// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArRyFBJ1xwFJnOTrlAd7AcwelrUd6VZnw",
  authDomain: "alterapp-cc140.firebaseapp.com",
  projectId: "alterapp-cc140",
  storageBucket: "alterapp-cc140.firebasestorage.app",
  messagingSenderId: "746443772402",
  appId: "1:746443772402:web:04ac53564a58637cbe1b6b",
  measurementId: "G-V7SMG5HQJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);