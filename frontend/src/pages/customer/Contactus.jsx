import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Contactus = () => {
  return (
    <div className="bg-[#FAF3E0] text-gray-800 min-h-screen px-6 lg:px-12 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 font-serif">
        Get in Touch with Us
      </h1>

      {/* Description */}
      <p className="text-center text-lg text-gray-700 mb-12 font-sans max-w-3xl mx-auto">
        We’d love to hear from you! Whether you have a question, or just want to say hello, feel free to reach out through the details below.
      </p>

      {/* Contact Info Section (Centered) */}
      <div className="flex justify-center">
        <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6"></h2>
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-center gap-6">
              <MapPin className="text-red-600 w-7 h-7" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">Lakeside, Pokhara St-2</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-6">
              <Phone className="text-green-600 w-7 h-7" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+977 9802367519</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-6">
              <Mail className="text-blue-600 w-7 h-7" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">margaretcafe@gmail.com</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-center gap-6">
              <Clock className="text-yellow-500 w-7 h-7" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Opening Hours</h3>
                <p className="text-gray-600">
                  Mon - Fri: 8:00 AM - 6:00 PM<br />
                  Sat - Sun: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-10 flex justify-center space-x-6">
            <Facebook className="text-gray-600 w-7 h-7 cursor-pointer text-blue-700 transition duration-300" />
            <Twitter className="text-gray-600 w-7 h-7 cursor-pointer text-blue-500 transition duration-300" />
            <Instagram className="text-gray-600 w-7 h-7 cursor-pointer text-red-600  transition duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
