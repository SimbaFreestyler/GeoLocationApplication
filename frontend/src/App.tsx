import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Map from "./components/Map";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
    <NavBar  />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login-page" element={<LoginForm />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
