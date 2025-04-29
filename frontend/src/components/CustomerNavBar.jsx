import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle profile dropdown
  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout action
  const handleLogout = () => {
    navigate("/");
  };

  // Handle cart click, navigate to cart page
  const handleCartClick = () => {
    navigate("/customer/cart");
  };

  // Function to simulate adding an item to the cart
  const addToCart = (quantity) => {
    setCartCount(prevCount => prevCount + quantity); // Add items to cart count
  };

  // Effect to load cart count from localStorage (if any)
  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(Number(storedCartCount));
    }
  }, []);

  // Effect to save cart count to localStorage whenever it changes
  useEffect(() => {
    if (cartCount > 0) {
      localStorage.setItem("cartCount", cartCount); // Store the cart count
    }
  }, [cartCount]);

  return (
    <nav className="flex justify-between items-center p-3 bg-[#6E4523] relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <img src={logo} className="h-20 w-auto" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        {[{ to: "/customer/home", label: "Home" },
          { to: "/customer/courses", label: "Our Courses" },
          { to: "/customer/menu", label: "Our Menu" },
          { to: "/customer/reserve", label: "Reservation" },
          { to: "/customer/about", label: "About Us" },
          { to: "/customer/contact", label: "Contact" }
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
                    to="/customer/orders"
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
        <button onClick={handleCartClick} className="relative">
          <FaShoppingCart className="text-white text-2xl" />
          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
