import { appActions } from "./AppActions";

export const authenticatedAction = (decoded) => {
  return {
    type: appActions.AUTHENTICATED,
    payload: decoded, // პირდაპირ გადავცემთ decoded, რომელიც მოიცავს user-ი
  };
};
export const loginAction = (data) => {
  return { type: appActions.LOG_IN, payload: data };
};

export const logOutAction = () => {
  return { type: appActions.LOG_OUT };
};
