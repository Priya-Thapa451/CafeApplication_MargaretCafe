import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import MenuImage from "../../assets/Menu.png"; // Ensure you have a menu image
import MenuCard from "../../components/MenuCard";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/menu");
      setMenuItems(response.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items.");
    }
  };

  const addToCart = async (menuId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to add items to the cart.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { menuId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Failed to add item to cart");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Menu Banner */}
      <div
        className="relative w-full h-72 bg-cover bg-center rounded-lg overflow-hidden mb-8 flex-col"
        style={{ backgroundImage: `url(${MenuImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-serif italic">
            Try our Desserts, Sweetness in every bite
          </h1>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold animate-bounce mt-2 text-amber-950">
          Our Menu
        </h1>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Image Section */}
            {item.imageUrl && (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}

            {/* Content Section */}
            <div className="p-4">
              <h2 className="text-lg font-bold mt-2">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-lg font-semibold mt-2">${item.price}</p>
              <button
                onClick={() => addToCart(item.id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display Error */}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Menu;
