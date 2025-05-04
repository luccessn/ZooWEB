import React from "react";

const SignUpForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col items-center gap-4 w-full max-w-sm">
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
          />
        </span>

        <input
          type="submit"
          className="w-full p-4 rounded-full bg-gray-600 text-gray-200 font-semibold text-sm cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-gray-600"
          value="sign up"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
