import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // for managing dropdown visibility
import logo from "../assets/Logo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"; // FontAwesome icons for profile and cart

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // to manage dropdown visibility

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/"); // Redirect after logout
  };

  const handleCartClick = () => {
    navigate("/customer/cart"); // Navigate to cart page
  };

  return (
    <nav className="flex justify-between items-center p-3 z-8 bg-[#6E4523]">
      <div className="flex items-center gap-6">
        <img src={logo} className="h-20 w-auto" alt="Logo" />
      </div>
      <ul className="flex gap-6">
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/customer/home">Home</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/courses">Our Courses</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/customer/menu">Our Menu</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/customer/reservation">Reservation</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/customer/about">About Us</Link>
        </li>
        <li className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-6">
        {/* Profile Icon */}
        <div className="relative">
          <button onClick={handleProfileClick}>
            <FaUserCircle className="text-white text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
              <ul>
                <li>
                  <Link
                    to="/customer/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <button onClick={handleCartClick}>
          <FaShoppingCart className="text-white text-2xl" />
        </button>
      </div>
    </nav>
  );
}
