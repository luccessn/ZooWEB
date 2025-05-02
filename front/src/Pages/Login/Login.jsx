import React from 'react';

const LoginForm = () => {
  return (
    <form className="flex flex-col items-center gap-4 w-full max-w-sm">
      <span className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="text-green-500 font-semibold self-start">
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

      <span className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-green-500 font-semibold self-start">
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
        Don't have an account?{' '}
        <a href="#" className="text-green-500">
          Sign up
        </a>
      </span>
    </form>
  );
};

export default LoginForm;
