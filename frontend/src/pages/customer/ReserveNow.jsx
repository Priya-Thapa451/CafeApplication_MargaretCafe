import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function ReserveNow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [service, setService] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    setAvailableTimeSlots([
      "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
    ]);
  }, []);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      return toast.error("Please log in first");
    }
    console.log("Token:", token);

    try {
      await axios.post(
        "http://localhost:3000/api/reservations/create",
        { name, email, phone, date, timeSlot, service },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reservation booked successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to book reservation");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4ebe2]">
      <div className="max-w-2xl mx-auto p-8 bg-[#fff8f1] shadow-lg rounded-lg">
        <h2 className="text-4xl font-semibold text-center text-[#5e3929] mb-6">
          Book Your Cozy Corner
        </h2>
        <form onSubmit={handleReservationSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              What's your Email?
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              What's your Phone Number?
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            />
          </div>

          {/* Time Slot */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              Time Slot
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            >
              <option value="">Select a time slot</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Table Size */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              Table Size
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            >
              <option value="" disabled>
                Select a table size
              </option>
              <option value="Table for 2">Table for 2</option>
              <option value="Table for 4">Table for 4</option>
              <option value="Table for 6">Table for 6</option>
              <option value="Table for 8">Table for 8</option>
              <option value="Table for 10">Table for 10</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-[#5e3929] font-medium mb-2">
              Reservation Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 bg-white border-[#c8b6a6] px-4 py-3 rounded-md focus:ring-2 focus:ring-[#a67c52] transition duration-300"
              required
            />
          </div>

          <p className="text-gray-500 text-sm mb-6">
            After booking, you will receive a confirmation pop-up.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#5e3929] hover:bg-[#4b2e23] text-white font-semibold py-3 rounded-md transition duration-300 focus:ring-2 focus:ring-[#a67c52]"
          >
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
}
