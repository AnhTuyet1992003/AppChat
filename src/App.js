// App.js
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from "./components/Authentication/login";
import Home from "./components/home";
import Register from "./components/Authentication/Register";
import Sidebar from "./components/Chat/sidebar/sidebar";
import {get, child, ref, getDatabase} from "firebase/database";
import React, {Fragment, useEffect, useState} from 'react';
import {initializeSocket} from "./socket/socket";
import ChatTab from "./components/Chat/sidebar/sidebarContent/chattab";
import ChatBox from "./components/Chat/chat";
import ChatContent from "./components/Chat/content/chatcontent/chatcontent";
import ChatHeader from "./components/Chat/content/chatheader/chatheader";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// Firebase configuration
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

function checkFirebaseConnection() {
    const dbRef = ref(database);
    get(child(dbRef, 'test')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('Firebase connection is successful: ', snapshot.val());
        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error('Error checking Firebase connection: ', error);
    });
}


function App() {
    useEffect(() => {
        initializeSocket('ws://140.238.54.136:8080/chat/chat');
        checkFirebaseConnection();
    }, []);

    return (
        <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace />} />
                        <Route path="/Login" element={<Login/>} />
                        <Route path="/Home" element={<Home/>}>
                            <Route path=":name" element={<ChatHeader />} />
                            <Route path=":name" element={<ChatContent />} />
                        </Route>
                        <Route path="/Register" element={<Register/>} />
                        <Route path="/Sidebar" element={<Sidebar/>} />
                        <Route path="/ChatTab" element={<ChatTab />} />

                    </Routes>
                </BrowserRouter>
        </Fragment>
    );
}

export default App;
