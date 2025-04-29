import React from "react";
import ReservationImage from "../../assets/Reservation.png";
import ReserveNow from "./ReserveNow";

export default function ReservationPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Background Image Section */}
      <div
        className="relative w-full h-72 bg-cover bg-center mb-8 flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${ReservationImage})` }}
      >
        <h1 className="text-4xl md:text-5xl text-white font-serif italic">
        A Seat for You Awaits
        </h1>
      </div>
      <ReserveNow />
    </div>
  );
}
