import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authStore";
import meetingReducer from "./meetingStore";

const store = configureStore({
  reducer: { auth: authReducer, meeting: meetingReducer },
});

export default store;
