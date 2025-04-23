import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // This will navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <nav className="flex justify-between items-center p-4 z-10 bg-[#6E4523]">
      <div className="flex items-center gap-6">
        <img src={logo} className="h-20 w-auto" alt="Logo"></img>
      </div>
      <ul className="flex gap-6">
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/courses">Our Courses</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/menu">Our Menu</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/reservation">Reservation</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/about">About Us</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-6">
        <button
          className="px-6 py-3 font-medium text-white bg-[#B47137] rounded-lg hover:bg-[#9E5E2D] transition duration-300"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="px-6 py-3 font-medium text-white bg-[#B47137] rounded-lg hover:bg-[#9E5E2D] transition duration-300"
          onClick={handleSignUpClick}
        >
          SignUp
        </button>
      </div>
    </nav>
  );
}