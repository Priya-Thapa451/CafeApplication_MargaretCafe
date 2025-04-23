import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
        console.error("Invalid response format:", response.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    }
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setEditModalOpen(true);
  };

  const updateOrderStatus = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${selectedOrder.id}/status`,
        { status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditModalOpen(false);
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4f0]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl border border-[#e0dcd5]">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#3b2f2f]">
          Customer Orders
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#ece6dd] text-[#3b2f2f]">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{order.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {order.user?.name || order.user?.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    Rs.{order.totalAmount}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                    {order.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {order.orderType}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => openEditModal(order)}
                      className="text-[#6b4f4f] hover:text-[#3b2f2f] underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 border border-[#e4dfd9]">
            <h2 className="text-lg font-semibold mb-4 text-[#3b2f2f]">
              Update Order Status
            </h2>
            <form onSubmit={updateOrderStatus}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-[#c5bfb5] rounded-md shadow-sm focus:ring focus:ring-[#d6bfa6]"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PREPARING">Preparing</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#6b4f4f] text-white py-2 px-4 rounded-md hover:bg-[#4f3838]"
              >
                Update Status
              </button>
            </form>
            <button
              onClick={() => setEditModalOpen(false)}
              className="mt-4 w-full text-[#a94444] hover:text-[#7a2f2f] py-2 px-4 rounded-md border border-[#d6cfc7]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
