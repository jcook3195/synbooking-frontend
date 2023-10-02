import { useEffect, useState } from "react"
function useLocalState(defaultValue, key){
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key)

    return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
  });

  useEffect(()=>{
   localStorage.setItem(key, JSON.stringify(value)); 
  }, [key, value]);

  return[value, setValue];
}


export {useLocalState}

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
