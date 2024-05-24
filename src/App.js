import logo from './logo.svg';
import './App.css';
import Login from "./components/Authentication/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from "./components/home";
import Register from "./components/Authentication/Register"
function App() {
  return (
    <div className="App">
      <header className={"App-header"}>
          <BrowserRouter>
              <Routes>
                  <Route path="/Login" element={<Login/>} />
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/Register" element={<Register/>} />
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
