import React from "react";
import Container from "./components/Layout/Container";
import Navbar from "./components/Nav/Navbar";

import "./App.scss";
import RoomColumn from "./components/Layout/RoomColumn/RoomColumn";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <RoomColumn />
      </Container>
    </React.Fragment>
  );
}

export default App;
