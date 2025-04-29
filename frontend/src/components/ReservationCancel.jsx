import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ReservationCancel = ({ reservationId, createdAt, status, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [isCancelable, setIsCancelable] = useState(false);

  useEffect(() => {
    if (!createdAt) return;
    const now = Date.now();
    const created = new Date(createdAt).getTime();
    const twoHoursMs = 2 * 60 * 60 * 1000;

    setIsCancelable(now - created <= twoHoursMs);
  }, [createdAt]);

  const handleCancel = async () => {
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please log in first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/reservation/${reservationId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(res.data?.message || "Reservation cancelled successfully!");

      if (onStatusChange) {
        onStatusChange("Cancelled");
      }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || "Failed to cancel reservation.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!reservationId || !createdAt) {
    return <p className="text-center text-gray-400 italic">No reservation found.</p>;
  }

  return (
    <div className="mt-4">
      {status !== "Cancelled" && isCancelable ? (
        <button
          onClick={handleCancel}
          disabled={loading}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#42a454c6] hover:bg-[#2b8a47] text-white"
          }`}
        >
          {loading ? "Canceling..." : "Cancel Reservation"}
        </button>
      ) : (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {status === "Cancelled"
            ? "This reservation has already been cancelled."
            : "You can only cancel reservations within 2 hours of booking."}
        </p>
      )}
    </div>
  );
};

export default ReservationCancel;
