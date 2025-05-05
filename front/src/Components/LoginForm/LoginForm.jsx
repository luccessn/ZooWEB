import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHandler } from "../../Api/ApiAuth";
import { authActions } from "../../Constant/auth/authActions";
import { useAppContext } from "../../Context/AppContextProvider";
import { loginAction } from "../../Context/AppActionsCreator";

const LoginForm = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const signup = () => {
    navigate("/signup");
  };
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({ ...prev, [name]: value }));
  };
  const [ErrorInfo, setErrorInfo] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const HandelSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    authHandler(authActions.login, user)
      .then((response) => {
        if (response.message === "Success") {
          navigate("/", { state: { success: true } });
          dispatch(loginAction(response));
        }

        console.log(response.user);

        console.log(response);
      })
      .catch((err) => {
        setErrorInfo(err.message);
      })
      .finally(() => setisLoading(false));
  };
  if (ErrorInfo) {
    return <div>Error: {ErrorInfo}</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="flex flex-col items-center gap-4 w-full max-w-sm"
        onSubmit={HandelSubmit}
      >
        <span className="w-full flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-green-500 font-semibold self-start"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-4 rounded-lg border-none bg-gray-300/40 outline outline-2 outline-gray-600 focus:outline-green-500"
            placeholder="Enter your email"
            onChange={ChangeInput}
          />
        </span>

        <span className="w-full flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-green-500 font-semibold self-start"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-4 rounded-lg border-none bg-gray-300/40 outline outline-2 outline-gray-600 focus:outline-green-500"
            placeholder="Enter your password"
            onChange={ChangeInput}
          />
        </span>

        <span className="text-gray-600">
          <a href="#" className="text-green-500">
            Forgot password?
          </a>
        </span>

        <input
          type="submit"
          className="w-full p-4 rounded-full bg-gray-600 text-gray-200 font-semibold text-sm cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-gray-600"
          value="Log in"
        />

        <span className="text-gray-600">
          Don't have an account?{" "}
          <button onClick={signup} className="text-green-500">
            Sign up
          </button>
        </span>
      </form>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
