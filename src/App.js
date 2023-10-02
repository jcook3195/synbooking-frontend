import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";

import "./App.scss";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";

function App() {
  //Eric Testing Connectivity
  const reqBody = {
    "username" : "Eric123",
    "password" : "1223"
  }

  /*package.json -> proxy*/
  fetch("api/auth/login", {
    headers: {
      "Content-Type" : "application/json"
    },
    method: "post",
    body: JSON.stringify(reqBody)
  }).then((response) => Promise.all([response.json(), response.headers]))
  .then(([body, headers]) => {
    const authValue = headers.get("authorization");
    console.log(authValue);
    console.log(body);
  });
  //=======================
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
