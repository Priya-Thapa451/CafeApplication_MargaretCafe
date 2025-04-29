import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Please log in first");
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/reservations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.error) {
          setError(res.data.error);
        } else {
          setReservations(res.data.reservations);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reservations");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const confirmReservation = async (reservationId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please log in first");
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/reservations/${reservationId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, status: "Confirmed" }
            : reservation
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to confirm reservation");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#6B4226]">
        Cafe Reservations
      </h2>

      {loading && (
        <p className="text-center text-[#A67856] font-medium text-lg">
          Loading reservations...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && reservations.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No reservations found.
        </p>
      )}

      {!loading && !error && reservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#FFF9F4] rounded-xl shadow-md border border-[#E5D4C0]">
            <thead className="bg-[#F1E4D3] text-[#5D3920]">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                  Service
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                  Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                  Time
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr
                  key={reservation.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#F9F5F0]"
                  } hover:bg-[#EFE7E0] transition duration-300`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {reservation.service}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {reservation.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {reservation.time}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium">
                    {reservation.status === "Confirmed" ? (
                      <span className="text-green-600 font-semibold">
                        Confirmed
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {reservation.status === "Pending" && (
                      <button
                        onClick={() => confirmReservation(reservation.id)}
                        className="px-5 py-2 bg-[#A67856] hover:bg-[#8D5E3B] text-white rounded-full text-sm font-semibold shadow transition-all duration-300"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
