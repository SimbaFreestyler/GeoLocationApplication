import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Map from "./components/Map";
import LoginForm from "./components/LoginForm";
import Account from "./components/Account";
import { useState } from "react";
import Vehicles from "./components/Vehicles";

function App() {
  const [loggedState, SetLoggedState] = useState<string>("loggedOut");

  return (
    <>
    <NavBar  loggedState={loggedState}/>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login-page" element={<LoginForm loggedState={loggedState} SetLoggedState={SetLoggedState}/>} />
      </Routes>
    </div>
    </>
  );
}

export default App;
