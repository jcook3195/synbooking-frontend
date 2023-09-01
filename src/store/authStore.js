import { createStore } from "redux";

const authReducer = (state = { loggedIn: false }, action) => {
  if (action.type === "login") {
    return {
      loggedIn: true,
    };
  }

  if (action.type === "logout") {
    return {
      loggedIn: false,
    };
  }

  return state;
};

const authStore = createStore(authReducer);

export default authStore;
