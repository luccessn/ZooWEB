import { appActions } from "./AppActions";

export const authenticatedAction = (token) => {
  return { type: appActions.AUTHENTICATED, payload: token };
};

export const loginAction = (data) => {
  return { type: appActions.LOG_IN, payload: data };
};

export const logOutAction = () => {
  return { type: appActions.LOG_OUT };
};
