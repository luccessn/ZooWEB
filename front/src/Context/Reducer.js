import { toggleLocalStorage } from "../Utils/jwt";
import { appActions } from "./AppActions";
import { jwtDecode } from "jwt-decode";

export const initials = {
  isAuthanticated: false,
  user: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case appActions.AUTHENTICATED:
      const user = jwtDecode(payload);
      return { ...state, isAuthanticated: true, user: user };
    case appActions.LOG_IN: {
      const { token } = payload;
      const user = jwtDecode(token);
      toggleLocalStorage(token);
      return { ...state, isAuthanticated: true, user };
    }
    case appActions.LOG_OUT:
      toggleLocalStorage();
      return { ...state, isAuthanticated: false, user: null };
    default:
      return state;
  }
};
