import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";

import "./App.scss";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";

function App() {
  return (
    <React.Fragment>
      <Router>
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
