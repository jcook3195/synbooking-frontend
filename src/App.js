import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {useLocalState} from "./store/authStore"

import Navbar from "./components/Nav/Navbar";

import "./App.scss";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/Route/routes";

function App() {
    /*    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MeetingScheduler />} exact />
          <Route path="/landing" element={<Landing />} exact />
        </Routes>
      </Router>
    </React.Fragment> */
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><MeetingScheduler/></PrivateRoute>} exact />
          <Route path="/landing" element={<Landing />} exact />
        </Routes>
      </Router>
    </React.Fragment>

  );
}

export default App;
