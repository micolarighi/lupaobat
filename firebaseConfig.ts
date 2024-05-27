// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj01SfA-0A9w4_qUgS_S25ybUqZ-oTTeo",
  authDomain: "college-a7320.firebaseapp.com",
  databaseURL: "https://college-a7320-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "college-a7320",
  storageBucket: "college-a7320.appspot.com",
  messagingSenderId: "342602983499",
  appId: "1:342602983499:web:4bbd5aefb9eb2e849005ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
// Initialize Realtime Database
const realtimedb = getDatabase(app);

export { db, realtimedb};
