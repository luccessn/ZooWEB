import React, { useState } from "react";
import { useEffect } from "react";
import { authHandler } from "../../Api/ApiAuth";
import { authActions } from "../../Constant/auth/authActions";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [ErrorInfo, setErrorInfo] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({ ...prev, [name]: value }));
  };
  const HandelSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    authHandler(authActions.signUp, user)
      .then((user) => {
        console.log(user);
        navigate("/login", { state: { success: true } });
      })
      .catch((error) => {
        setErrorInfo(error.message);
      })
      .finally(() => setisLoading(false));
  };
  if (ErrorInfo) {
    return <div>Error : {ErrorInfo}</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="flex flex-col items-center gap-4 w-full max-w-sm"
        onSubmit={HandelSubmit}
      >
        {/* First Name */}
        <span className="w-full flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className="text-green-500 font-semibold self-start"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full p-4 rounded-lg border-none bg-gray-300/40 outline outline-2 outline-gray-600 focus:outline-green-500"
            placeholder="Enter your first name"
            onChange={ChangeInput}
          />
        </span>

        {/* Last Name */}
        <span className="w-full flex flex-col gap-2">
          <label
            htmlFor="lastName"
            className="text-green-500 font-semibold self-start"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full p-4 rounded-lg border-none bg-gray-300/40 outline outline-2 outline-gray-600 focus:outline-green-500"
            placeholder="Enter your last name"
            onChange={ChangeInput}
          />
        </span>

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
        <span className="w-full flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-green-500 font-semibold self-start"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full p-4 rounded-lg border-none bg-gray-300/40 outline outline-2 outline-gray-600 focus:outline-green-500"
            placeholder="Repeat your password"
            onChange={ChangeInput}
          />
        </span>

        <input
          type="submit"
          className="w-full p-4 rounded-full bg-gray-600 text-gray-200 font-semibold text-sm cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-gray-600"
          value="sign up"
        />
      </form>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
