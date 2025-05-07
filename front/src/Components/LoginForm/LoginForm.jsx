import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHandler } from "../../Api/ApiAuth";
import { authActions } from "../../Constant/auth/authActions";
import { useAppContext } from "../../Context/AppContextProvider";
import { loginAction } from "../../Context/AppActionsCreator";
import "./login-animation.css";

const LoginForm = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [ErrorInfo, setErrorInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!user.email.trim()) {
      errors.email = "შეიყვანე ელ-ფოსტა";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "არასწორი ელ-ფოსტის ფორმატი";
    }

    if (!user.password) {
      errors.password = "შეიყვანე პაროლი";
    } else if (user.password.length < 6) {
      errors.password = "პაროლი უნდა იყოს მინ. 6 სიმბოლო";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    authHandler(authActions.login, user)
      .then((response) => {
        if (response.message === "Success") {
          navigate("/", { state: { success: true } });
          dispatch(loginAction(response));
        }
      })
      .catch((err) => setErrorInfo(err.message))
      .finally(() => setIsLoading(false));
  };

  const signup = () => navigate("/signup");

  if (ErrorInfo) return <div>Error: {ErrorInfo}</div>;

  return (
    <div className="login-container flex justify-center items-center min-h-screen  bg-[#1f293a]">
      <div className="absolute w-[90%] max-w-[300px] z-10 p-6 rounded-full bg-transparent text-white flex flex-col items-center space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-cyan-400">შესვლა</h2>

        {/* Email */}
        <div className="w-full relative">
          <input
            type="email"
            name="email"
            placeholder="ელ-ფოსტა"
            onChange={ChangeInput}
            className="w-full px-4 py-2 rounded-full text-black outline-none"
          />
          {formErrors.email && (
            <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="პაროლი"
            onChange={ChangeInput}
            className="w-full px-4 py-2 pr-10 rounded-full text-black outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          {formErrors.password && (
            <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>

        <span className="text-sm text-cyan-300 cursor-pointer hover:underline">
          დაგავიწყდა პაროლი?
        </span>

        <button
          onClick={HandelSubmit}
          className="bg-cyan-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-cyan-300 transition"
        >
          შესვლა
        </button>

        <span className="text-sm text-cyan-300 text-center">
          არ გაქვს ანგარიში?
          <button onClick={signup} className="ml-1 underline hover:text-white">
            დარეგისტრირდი
          </button>
        </span>
      </div>

      <div className="login-animation">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${i * (360 / 50)}deg)`,
              animationDelay: `${i * (3 / 50)}s`,
            }}
          />
        ))}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
