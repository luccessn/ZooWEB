import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHandler } from "../../Api/ApiAuth";
import { authActions } from "../../Constant/auth/authActions";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [ErrorInfo, setErrorInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!user.firstName.trim()) errors.firstName = "შეიყვანე სახელი";
    if (!user.lastName.trim()) errors.lastName = "შეიყვანე გვარი";
    if (!user.email.trim()) {
      errors.email = "შეიყვანე ელ-ფოსტა";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "ელ-ფოსტა არასწორია";
    }
    if (!user.password) {
      errors.password = "შეიყვანე პაროლი";
    } else if (user.password.length < 6) {
      errors.password = "პაროლი უნდა იყოს მინ. 6 სიმბოლო";
    }
    if (!user.confirmPassword) {
      errors.confirmPassword = "გაიმეორე პაროლი";
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "პაროლები არ ემთხვევა";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    authHandler(authActions.signUp, user)
      .then(() => navigate("/login", { state: { success: true } }))
      .catch((error) =>
        setFormErrors({ general: error.message || "რაღაც შეცდომა მოხდა" })
      )
      .finally(() => setIsLoading(false));
  };

  const login = () => navigate("/login");

  return (
    <div className="login-container flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="absolute w-[90%] max-w-[300px] z-10 p-6 rounded-3xl bg-[#1f293a] text-white flex flex-col items-center space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-bold text-cyan-400">რეგისტრაცია</h2>

        <div className="w-full relative">
          <input
            type="text"
            name="firstName"
            placeholder="სახელი"
            onChange={ChangeInput}
            className="w-full px-4 py-2 rounded-full text-black outline-none"
          />
          {formErrors.firstName && (
            <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type="text"
            name="lastName"
            placeholder="გვარი"
            onChange={ChangeInput}
            className="w-full px-4 py-2 rounded-full text-black outline-none"
          />
          {formErrors.lastName && (
            <p className="text-red-400 text-xs mt-1">{formErrors.lastName}</p>
          )}
        </div>

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

        {/* Confirm Password */}
        <div className="w-full relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="გაიმეორე პაროლი"
            onChange={ChangeInput}
            className="w-full px-4 py-2 pr-10 rounded-full text-black outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {formErrors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">
            {formErrors.confirmPassword}
          </p>
        )}

        <button className="bg-cyan-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-cyan-300 transition">
          დარეგისტრირება
        </button>

        {formErrors.general && (
          <p className="text-red-400 text-sm mt-2 text-center">
            {formErrors.general}
          </p>
        )}

        <span className="text-sm text-cyan-300 text-center">
          უკვე გაქვს ანგარიში?
          <button onClick={login} className="ml-1 underline hover:text-white">
            შესვლა
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

export default SignUpForm;
