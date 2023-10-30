import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Components/AuthPages/store";
import Login from "./Components/AuthPages/Login";
import Working from "./Components/HomePage/Working";
import HomePage from "./Components/HomePage/HomePage";
import SupportDiets from "./Components/HomePage/SupportDiets";
import Browse from "./Components/HomePage/Browse";
import Signup from "./Components/AuthPages/Signup";
import UserLoggedIn from "./Components/Dasboard/UserRegistration/LandingPage";
import Result from "./Components/Dasboard/UserRegistration/Result";
import LandingPage from "./Components/Dasboard/UserRegistration/LandingPage";

const App = () => {
  return (
    <>
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<Working />} />
          <Route path="/supporteddiet" element={<SupportDiets />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </Router>
    </Provider>
    
    </>
  );
};

export default App;
