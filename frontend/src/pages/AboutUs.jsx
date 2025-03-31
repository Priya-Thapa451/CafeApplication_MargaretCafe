import About from "../assets/About.png";
import { Link } from "react-router-dom";
export default function AboutUs() {
  return (
    <div className="bg-[#FAF3E0] text-gray-800 min-h-screen px-6 lg:px-12 py-10">
      {/* Header Section */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${About})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10"></div>
        <h1 className="relative text-white text-4xl lg:text-5xl font-extrabold font-serif drop-shadow-lg">
          About Margaret Cafe
        </h1>
      </div>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-3xl font-semibold text-[#B47137] mb-4">
          Welcome to Margaret Cafe
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          "Welcome to Margaret Cafe – a place where the aroma of fresh coffee
          fills the air, the warmth of friendship is brewed in every cup, and
          every visit feels like coming home."
        </p>
      </div>

      {/* History Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-center text-[#B47137] mb-6">
          Our Story
        </h2>
        <p className="text-lg text-gray-700 text-center leading-relaxed">
          Nestled in the heart of the city, Margaret Cafe is more than just a
          place to grab a cup of coffee—it's a warm embrace, a cherished
          retreat, and a celebration of flavors that bring people together. Our
          journey began in 2022, inspired by the love of handcrafted coffee,
          freshly baked delights, and the simple joy of shared moments.
          Margaret, the heart and soul behind our cafe, had a dream—to create a
          space where people could pause, savor, and connect. With a deep
          passion for quality and an eye for detail, she transformed a small,
          cozy corner into a café that radiates warmth and hospitality.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-16">
        <div className="max-w-md p-6 bg-white shadow-md rounded-lg text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-[#B47137] mb-3 font-serif">
            Our Mission
          </h3>
          <p className="text-gray-700">
            At Margaret Cafe, our mission is to create a warm and inviting space
            where people can connect, unwind, and indulge in exceptional coffee
            and handcrafted delights.
          </p>
        </div>
        <div className="max-w-md p-6 bg-white shadow-md rounded-lg text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-[#B47137] mb-3 font-serif">
            Our Vision
          </h3>
          <p className="text-gray-700">
            Our vision is to become the go-to café destination, known not only
            for our outstanding coffee and pastries but also for the atmosphere
            of warmth, creativity, and belonging we cultivate.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-[#B47137] mb-4">
          Come Visit Us!
        </h2>
        <p className="text-lg text-gray-700">
          Whether you're a fan of coffee or have a sweet tooth, Margaret Cafe
          invites you to come and enjoy.
        </p>
        <Link to="/Menu">
          <button className="mt-6 px-6 py-3 bg-[#B47137] text-white font-medium rounded-lg shadow-md hover:bg-[#A5612F] transition duration-300 hover:scale-105">
            Explore Our Menu
          </button>
        </Link>
      </div>
    </div>
  );
}