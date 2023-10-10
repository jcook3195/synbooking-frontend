import { Axios } from "axios";
import { useLocalState } from "../store/useLocalStore";
import { useEffect, useState } from "react"
import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

//const [jwt, setJwt] = useLocalState("", "jwt");

const jwt = localStorage.getItem("jwt");

let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/users",
    headers: {
    "Content-Type": "applicaiton/json",
    Authorization: `bearer ${jwt}`,
    },
}
axios
.request(config)
.then((res) => {
    let usersRep = "";
    for(let i = 0; i < res.data.length; i++){
        if( i < res.data.length-1){
        usersRep = (usersRep + `"${res.data[i].id}":"${res.data[i].username}",`);
        }
        else {
        usersRep = (usersRep + `"${res.data[i].id}":"${res.data[i].username}"`);
        usersRep = `{${usersRep}}`;
        }
    }
    const users = JSON.parse(usersRep);
    const initialState = {
        loggedIn: false,
        users,
    };
    console.log(initialState.users);
    localStorage.setItem("initial", JSON.stringify(initialState));
})

const initialState = JSON.parse(localStorage.getItem("initial"));
//console.log(initialState);


const authSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});


export const authActions = authSlice.actions;

export default authSlice.reducer;
