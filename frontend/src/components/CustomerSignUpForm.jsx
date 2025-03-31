import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CustomerSignupForm() {
  // Validation function
  const Validation = (userInput) => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

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

  // State management
  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // Handle blur to clear error messages
  const handleBlur = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(userInput);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/customer/register",
        userInput
      );
      console.log("Response:", response);
      toast.success("Registration successful");
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md border-2 border-black p-6 bg-white rounded-lg">
        <div className="font-semibold text-3xl mb-6 text-center">
          Customer Register
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="email"
                name="email"
                className="ml-2 w-full outline-none"
                placeholder="Email"
                value={userInput.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                name="name"
                className="ml-2 w-full outline-none"
                placeholder="Username"
                value={userInput.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="password"
                name="password"
                className="ml-2 w-full outline-none"
                placeholder="Password"
                value={userInput.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-[#B47137] text-white font-medium rounded-md hover:bg-[#A5612F]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}