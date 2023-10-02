import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {useLocalState} from "./store/authStore"

import Navbar from "./components/Nav/Navbar";

import "./App.scss";
import MeetingScheduler from "./pages/MeetingScheduler";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/Route/Routes";

function App() {
//   //Eric Testing Connectivity
//   const [jwt, setJwt] = useLocalState("", "jwt");

//   useEffect(() => {
//     if (!jwt){
//       const reqBody = {
//         "username" : "Eric123",
//         "password" : "1223"
//       }
    
//       /*package.json -> proxy*/
//       fetch("api/auth/login", {
//         headers: {
//           "Content-Type" : "application/json"
//         },
//         method: "post",
//         body: JSON.stringify(reqBody)
//       }).then((response) => Promise.all([response.json(), response.headers]))
//       .then(([body, headers]) => {
//         setJwt(headers.get("authorization"));
//         console.log(jwt);
//         //console.log(body);
//       });
//     } 
// })

// useEffect(() => {
//   console.log(`JWT is: ${jwt}`);
// }, [jwt]);
//   //=======================
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
