import React from "react";
import { useAppContext } from "../Context/AppContextProvider";

const AuthGuard = ({ children }) => {
  const { state } = useAppContext();
  return <>{state.isAuthanticated ? children : children}</>;
};

export default AuthGuard;
