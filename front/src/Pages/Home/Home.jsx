import React from "react";
import { useAppContext } from "../../Context/AppContextProvider";
import { logOutAction } from "../../Context/AppActionsCreator";
const Home = () => {
  const { state, dispatch } = useAppContext();
  console.log(state);
  const logout = () => {
    dispatch(logOutAction());
  };
  return (
    <div>
      <h1 className="text-4xl bg-red-500">dadad</h1>
      <h1 className="text-white bg-red-400 mt-6 text-xl">
        {state.user ? state.user.email : "alo"}
      </h1>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default Home;
