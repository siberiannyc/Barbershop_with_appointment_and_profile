import React from "react";
import { Navigate } from "react-router-dom";
import Selectors from "../store/selectors";

export default function PrivateRoute({ children }) {
  const selector = Selectors();
  return selector.authorized ? children : <Navigate to="/authenticate" />;
}
