import React from "react";
import ReservationImage from "../../assets/Reservation.png";

export default function ReservationPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Background Image Section */}
      <div
        className="relative w-full h-72 bg-cover bg-center mb-8 flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${ReservationImage})` }}
      >
        &nbsp; {/* Ensures the div has content */}
      </div>
    </div>
  );
}