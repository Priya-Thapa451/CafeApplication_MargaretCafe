import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const Validation = (userInput) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errors = {};
    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Email is invalid";
    }
    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const errors = Validation(userInput);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Error in form!");
    } else {
      toast.success("Validation Passed!");
    }

    return errors;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (Object.keys(errors).length > 0) return;

    console.log(userInput);

    try {
      const endpoint =
        userInput.role === "STAFF"
          ? "http://localhost:3000/api/users/staff/login"
          : "http://localhost:3000/api/users/customer/login";

      const response = await axios.post(endpoint, userInput, {
        withCredentials: true,
      });
      Cookies.set("token", response.data.token);

      toast.success("Logged in successfully!");

      if (userInput.role === "STAFF") {
        navigate("/staff/home");
      } else {
        navigate("/customer/home");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid email or password."
      );
      setErrors({ general: error.response?.data?.error || "Login failed!" });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#E2D1C3] via-[#F3E7DB] to-[#D5BDAF] p-6">
      <div className="bg-white p-14 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-center text-5xl font-extrabold text-[#6E4523] mb-10">
          Welcome Back
        </h2>
        <form className="space-y-8" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all duration-300 text-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all duration-300 text-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-[#6E4523] text-white font-bold text-lg rounded-2xl hover:bg-[#5a371c] transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/forget"
            className="text-[#6E4523] text-md font-semibold hover:underline hover:text-[#5a371c] transition-all duration-300"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
