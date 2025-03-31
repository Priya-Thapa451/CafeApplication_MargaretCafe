import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3E2723] text-white py-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-[#D7A86E]">Margaret Cafe</h2>
            <p className="mt-3 text-gray-300">
              A cozy cafe where coffee meets culture. Enjoy handcrafted brews
              and homemade delights.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#D7A86E]">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="hover:text-[#D7A86E] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D7A86E] transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D7A86E] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D7A86E] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-[#D7A86E]">Contact Us</h3>
            <p className="mt-3 flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt /> 123 Coffee St, Downtown
            </p>
            <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <FaPhone /> +123 456 7890
            </p>
            <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope /> hello@margaretcafe.com
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:text-[#D7A86E]">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-[#D7A86E]">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-[#D7A86E]">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-500 pt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Margaret Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}