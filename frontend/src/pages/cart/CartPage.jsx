import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get(`http://localhost:5000/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setCartItems(response.data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch cart";
      setError(errorMessage);
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        Cookies.remove("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const token = Cookies.get("token");

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success("Item removed from cart!");
      fetchCart();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error removing item.";
      toast.error(errorMessage);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = Cookies.get("token");

      await axios.put(
        `http://localhost:5000/api/cart/update/${cartItemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      fetchCart();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error updating quantity.";
      toast.error(errorMessage);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-10 text-[#4b2e2b]">Loading cart...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {typeof error === "string" ? error : JSON.stringify(error)}
      </p>
    );

  return (
    <div className="min-h-screen bg-[#f9f4ef] flex flex-col items-center py-10 px-4 sm:px-6">
      <h2 className="text-4xl font-bold mb-8 text-[#4b2e2b]">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-[#6b4f4f]">Your cart is currently empty.</p>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b last:border-none py-4"
            >
              <div className="flex items-center gap-4">
                {item.menu.imageUrl ? (
                  <img
                    src={`http://localhost:5000${item.menu.imageUrl}`}
                    alt={item.menu.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                    No Image
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-lg text-[#4b2e2b]">{item.menu.name}</h4>
                  <p className="text-[#8a6e63] text-sm">${item.menu.price.toFixed(2)} each</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-lg font-bold bg-[#eee2d3] hover:bg-[#e4d4c2] text-[#4b2e2b]"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-[#4b2e2b]">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-lg font-bold bg-[#eee2d3] hover:bg-[#e4d4c2] text-[#4b2e2b]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-[#4b2e2b] hover:bg-[#3d2623] text-white px-4 py-1.5 rounded-md text-sm transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-6 mt-8 rounded-2xl shadow-lg">
          <div className="text-right text-xl font-semibold text-[#4b2e2b] mb-4">
            <p>Total: RS{totalPrice.toFixed(2)}</p>
          </div>
          <OrderForm cartItems={cartItems} totalAmount={totalPrice} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
