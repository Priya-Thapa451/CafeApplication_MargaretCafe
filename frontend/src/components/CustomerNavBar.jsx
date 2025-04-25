import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/customer/cart");
  };

  return (
    <nav className="flex justify-between items-center p-3 bg-[#6E4523] relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <img src={logo} className="h-20 w-auto" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        {[
          { to: "/customer/home", label: "Home" },
          { to: "/customer/courses", label: "Our Courses" },
          { to: "/customer/menu", label: "Our Menu" },
          { to: "/customer/reservation", label: "Reservation" },
          { to: "/customer/about", label: "About Us" },
          { to: "/customer/contact", label: "Contact" },
        ].map((item, index) => (
          <li
            key={index}
            className="hover:text-yellow-700 transition duration-300 cursor-pointer font-semibold text-white text-lg font-serif"
          >
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Profile and Cart */}
      <div className="hidden md:flex items-center gap-6 relative z-50">
        {/* Profile Icon */}
        <div className="relative">
          <button onClick={handleProfileClick}>
            <FaUserCircle className="text-white text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#8B5E3C] text-white rounded-lg shadow-xl z-10 border border-[#c9a66b] font-serif">
              <ul>
                <li>
                  <Link
                    to="/customer/profile"
                    className="block px-4 py-2 hover:bg-[#a7744f]"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-[#a7744f]"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#a7744f]"
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
