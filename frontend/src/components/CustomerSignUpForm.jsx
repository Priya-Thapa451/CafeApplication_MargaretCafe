import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CustomerSignupForm() {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // Track registration success

  const Validation = (userInput) => {
    let errors = {};

    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Email must be a valid Gmail address";
    }

    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!userInput.name) {
      errors.name = "Username is required";
    } else if (userInput.name.length < 3) {
      errors.name = "Username must be at least 3 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(userInput);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/customer/register",
        userInput
      );
      console.log("Response:", response);
      toast.success("Registration successful! Please click Login to continue.");
      setSuccess(true); // Set success to true to enable login click
    } catch (error) {
      console.error("Error response:", error.response);
      if (
        error.response &&
        error.response.data.message === "Email is already in use."
      ) {
        setErrors({ email: "Email is already in use." });
        toast.error("Email is already in use.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
      {/* Email */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          type="text" // using text instead of email to disable browser validation
          name="email"
          value={userInput.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Gmail address"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all duration-300"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Username
        </label>
        <input
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your username"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all duration-300"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={userInput.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Create a strong password"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all duration-300"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#6E4523] text-white font-semibold rounded-xl hover:bg-[#5a371c] transition-all duration-300 shadow-lg hover:shadow-2xl"
      >
        Sign Up
      </button>

      {/* Link to Login */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <span
          className={`${
            success
              ? "text-[#6E4523] font-semibold cursor-pointer hover:underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => success && navigate("/login")}
        >
          Login
        </span>
      </div>
    </form>
  );
}
