import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Payment from "../payment/Payment";

const OrderForm = ({ cartItems }) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [orderType, setOrderType] = useState("DELIVERY");
  const [triggerEsewa, setTriggerEsewa] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handlePlaceOrder = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      if (paymentMethod === "Esewa") {
        const response = await axios.post(
          "http://localhost:5000/api/payment/initiate",
          {
            address,
            orderType,
            cartItems,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setPaymentData(response.data);
        setTriggerEsewa(true);
      } else {
        await axios.post(
          "http://localhost:5000/api/orders/place",
          {
            address,
            paymentMethod,
            orderType,
            cartItems,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        toast.success("Order placed successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg max-w-md mx-auto p-8 mt-12 font-sans">
      <h2 className="text-center text-2xl font-bold text-lime-800 mb-6 tracking-tight">
        🧾 Margaret Café — Order Form
      </h2>

      <div className="space-y-6 text-sm text-gray-800">
        <div>
          <label className="block mb-2 font-semibold">📍 Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">📦 Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="DELIVERY">Delivery</option>
            <option value="PICKUP">Pickup</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">💳 Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="CARD">Cash on Delivery</option>
            <option value="Esewa">eSewa</option>
          </select>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-2 bg-lime-700 text-white font-semibold rounded-lg hover:bg-lime-800 transition"
        >
          ✅ Place Order
        </button>

        {triggerEsewa && paymentData && (
          <div className="mt-8 border-t pt-4">
            <Payment paymentData={paymentData} />
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        Your details are safe & secure 🔒
      </p>
    </div>
  );
};

export default OrderForm;
