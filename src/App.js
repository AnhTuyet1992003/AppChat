// App.js
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from "./components/Authentication/login";
import home from "./components/home";
import Register from "./components/Authentication/Register";
import { database } from "./firebase";
import { get, child, ref } from "firebase/database";

function App() {
    return (
        <div className="App">
            <header className={"App-header"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace />} />
                        <Route path="/Login" element={<Login/>} />
                        <Route path="/Home" element={<home/>} />
                        <Route path="/Register" element={<Register/>} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;
