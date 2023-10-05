import { Axios } from "axios";
import { useLocalState } from "../store/useLocalStore";
import { useEffect, useState } from "react"


// async function UserReturn () {
//   const [jwt, setJwt] = useLocalState("", "jwt");

//   const response = await fetch("http://localhost:8080/users");
//   var data = await response.json();
//   console.log(data);
// }


// export {UserReturn}

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loggedIn: false,
//   users: {
//     1: "Jordan Cook",
//     2: "Ethan Shufflebarger",
//     3: "Shelby Parrish",
//     4: "Kado Dang",
//     5: "Eric Cooper",
//   },
// };

// const authSlice = createSlice({
//   name: "loggedIn",
//   initialState,
//   reducers: {
//     login(state) {
//       state.loggedIn = true;
//     },
//     logout(state) {
//       state.loggedIn = false;
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;
