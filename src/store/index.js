import { configureStore } from "@reduxjs/toolkit";

//import authReducer from "./authStore";
import meetingReducer from "./meetingStore";
import modalReducer from "./modalStore";
import alertReducer from "./alertStore";

const store = configureStore({
  reducer: {
    //auth: authReducer,
    meetings: meetingReducer,
    modals: modalReducer,
    alerts: alertReducer,
  },
});

export default store;
