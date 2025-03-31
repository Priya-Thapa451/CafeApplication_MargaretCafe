import { Link } from "react-router-dom";
import cafe from "../assets/Cafe.png";

export default function Hero() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src={cafe}
        alt="Cafe background"
        className="w-full h-full object-cover brightness-75"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text Content */}
      <div className="absolute flex flex-col items-center text-center text-white animate-fadeIn">
        <h1 className="mb-5 text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Margaret Cafe
        </h1>
        <p className="mb-5 text-lg md:text-xl italic opacity-90 animate-bounce">
          Sipping Serenity at the Coffee Bar.
        </p>

        {/* Buttons with spacing */}
        <div className="flex space-x-6">
          <Link to="/about">
            <button className="px-6 py-3 bg-[#B47137] hover:bg-[#8a5a28] text-white font-semibold rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
              About Us
            </button>
          </Link>

          <Link to="/menu">
            <button className="px-6 py-3 bg-[#B47137] hover:bg-[#8a5a28] text-white font-semibold rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
              Explore Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}