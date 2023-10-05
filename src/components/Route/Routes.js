import React from "react";
import { useLocalState } from "../../store/authStore";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const [jwt, setJwt] =useLocalState("", "jwt");
  return jwt ? children : <Navigate to="/Landing"/>;
};

export default PrivateRoute;