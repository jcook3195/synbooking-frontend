import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";
import Loader from "./components/UI/Loader/Loader";

import "./App.scss";
import PrivateRoute from "./components/Routing/Route";

//<Navbar />

function App() {
  return (
    <React.Fragment>
      <Router>
        <Loader />
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><MeetingScheduler /></PrivateRoute>} exact />
          <Route path="/landing" element={<Landing />} exact />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
