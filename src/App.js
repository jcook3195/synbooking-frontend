import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";
import Loader from "./components/UI/Loader/Loader";

import "./App.scss";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Loader />
        <Navbar />
        <Routes>
          <Route path="/" element={<MeetingScheduler />} exact />
          <Route path="/landing" element={<Landing />} exact />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
