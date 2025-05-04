import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initials, reducer } from "./Reducer";
import { isTokenValid, toggleLocalStorage } from "../Utils/jwt";
import { authenticatedAction } from "./AppActionsCreator";

const context = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initials);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && isTokenValid(token)) {
      dispatch(authenticatedAction(token));
    } else if (token && !isTokenValid(token)) {
      toggleLocalStorage();
    }
  }, []);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => {
  const AppContext = useContext(context);
  if (AppContext) {
    return AppContext;
  }
  throw new Error("Context Error");
};
