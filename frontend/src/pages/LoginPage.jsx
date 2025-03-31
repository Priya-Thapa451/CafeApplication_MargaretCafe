import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
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
    role: "USER", // Default value, can be "STAFF" or "CUSTOMER"
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

    // Check userInput values
    console.log(userInput); // Add a console log to check the payload

    try {
      const endpoint =
        userInput.role === "STAFF"
          ? "http://localhost:3000/api/users/staff/login"
          : "http://localhost:3000/api/users/customer/login";

      const response = await axios.post(endpoint, userInput, {
        withCredentials: true, // Send cookies with the request
      });
      Cookies.set("token", response.data.token); // Save token in cookies

      // Success - Show success toast message
      toast.success("Logged in successfully!");

      // Navigate to different pages based on the role
      if (userInput.role === "STAFF") {
        navigate("/staff/home");
      } else {
        navigate("/customer/home");
      }
    } catch (error) {
      // Show error toast if login failed
      toast.error(
        error.response?.data?.error || "Login failed! Please try again."
      );
      setErrors({ general: error.response?.data?.error || "Login failed!" });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r  p-6">
      <div className="bg-white p-10 w-full sm:w-96 rounded-2xl shadow-lg border-2 border-[#A5A9B3]">
        <h3 className="text-center text-3xl font-semibold text-[#3A3A3A] mb-8">
          Login
        </h3>

        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="text-base font-medium text-gray-700 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-4 bg-white border-2 border-[#A5A9B3] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-base font-medium text-gray-700 block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-4 bg-white border-2 border-[#A5A9B3] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E4523] transition-all"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 px-4 font-semibold text-white bg-[#6E4523] rounded-xl shadow-md hover:bg-[#935927] focus:outline-none transition-all"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Forgot Password link */}
        <div className="text-center mt-4">
          <Link to="/forget" className="text-[#6E4523] hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}