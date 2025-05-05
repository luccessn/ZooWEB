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
import { jwtDecode } from "jwt-decode"; // აქ არის jwt-decode

const context = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initials);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && isTokenValid(token)) {
      const decoded = jwtDecode(token); // ტოკენის დეცოდირება
      console.log("Decoded Token:", decoded);
      dispatch(authenticatedAction(decoded)); // ტოკენიდან გამოვყავით user-ი და გავგზავნეთ დისპეჩერში
    } else if (token && !isTokenValid(token)) {
      toggleLocalStorage(); // თუ ტოკენი არ ვარგა, წავშალოთ იგი
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
