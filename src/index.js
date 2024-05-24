import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import firebase from 'firebase';
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDwplCXmmoBcfvUhKX1a50Zzn1mQ4F45xw",
//     authDomain: "appchat-frontend.firebaseapp.com",
//     projectId: "appchat-frontend",
//     storageBucket: "appchat-frontend.appspot.com",
//     messagingSenderId: "494767959162",
//     appId: "1:494767959162:web:ce7639451c7afcfc64dfc3",
//     measurementId: "G-9TKZ7BPTB6"
// };

// firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
