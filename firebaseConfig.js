// firebaseConfig.js
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyB_f4mPbCy2-6-ORAwzrdRSr6F-9QPadU0",
    authDomain: "seniorconnect-e5226.firebaseapp.com",
    projectId: "seniorconnect-e5226",
    storageBucket: "seniorconnect-e5226.appspot.com",
    messagingSenderId: "502273525341",
    appId: "1:502273525341:web:47ccccd20570469c81efb4",
    measurementId: "G-CN4W84VVM3"
  };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// const db = firebase.firestore();

// export { db };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };