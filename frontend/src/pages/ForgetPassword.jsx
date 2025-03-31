import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // To link to the Reset Password page

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="mx-auto h-3/4 p-10 flex justify-center items-center">
      <div className="font-[sans-serif] items-center p-6 w-1/3 mx-auto bg-[#F2F0EF] rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
        <form className="w-full" onSubmit={handleForgotPassword}>
          <div className="mb-3 text-center">
            <h3 className="text-[#252525] lg:text-3xl text-2xl font-extrabold">
              Forget Password
            </h3>
          </div>

          <div>
            <label className="text-gray-800 text-sm font-semibold block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-[#BAA898] pl-4 pr-12 py-3.5 outline-none rounded-xl"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full shadow-xl font-extrabold py-3 px-4 text-base tracking-wide rounded-xl bg-[#606060] hover:bg-[#2B2B2B] text-white border focus:outline-none transition-all"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        {message && <p>{message}</p>}

        <div className="mt-4 text-center">
          <Link to="/login" className="text-[#7E4B3C] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}