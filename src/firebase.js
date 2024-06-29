// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, child,get, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwplCXmmoBcfvUhKX1a50Zzn1mQ4F45xw",
    authDomain: "appchat-frontend.firebaseapp.com",
    databaseURL: "https://appchat-frontend-default-rtdb.firebaseio.com",
    projectId: "appchat-frontend",
    storageBucket: "appchat-frontend.appspot.com",
    messagingSenderId: "494767959162",
    appId: "1:494767959162:web:ce7639451c7afcfc64dfc3",
    measurementId: "G-9TKZ7BPTB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database, ref, set, push, child, get, onValue };