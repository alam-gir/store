// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "store-5a1d6.firebaseapp.com",
  projectId: "store-5a1d6",
  storageBucket: "store-5a1d6.appspot.com",
  messagingSenderId: "668260645955",
  appId: "1:668260645955:web:a42db27956576510dd68f6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firebaseDB = getFirestore()
const firebaseStorage = getStorage()

export {app, firebaseDB, firebaseStorage }