// App.js
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from "./components/Authentication/login";
import Home from "./components/home";
import Register from "./components/Authentication/Register";
import Sidebar from "./components/Chat/sidebar/sidebar";
import { database } from "./firebase";
import { get, child, ref } from "firebase/database";
import React, { Fragment } from 'react';
function App() {
    return (
        <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace />} />
                        <Route path="/Login" element={<Login/>} />
                        <Route path="/Home" element={<Home/>} />
                        <Route path="/Register" element={<Register/>} />
                        <Route path="/Sidebar" element={<Sidebar/>} />
                    </Routes>
                </BrowserRouter>
        </Fragment>
    );
}

export default App;
