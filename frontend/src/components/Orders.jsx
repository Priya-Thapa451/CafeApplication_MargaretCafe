import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await axios.get("/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError("Failed to load your orders");
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading your orders...</p>;
  if (error)
    return <p className="text-center text-red-600 font-semibold mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-serif">
      <h2 className="text-3xl font-bold text-amber-950 mb-8 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <p className="text-lg font-semibold text-amber-900">
                    Order ID: #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full uppercase tracking-wide shadow-sm ${
                    order.status === "PENDING"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "DELIVERED"
                      ? "bg-green-200 text-green-800"
                      : order.status === "CANCELLED"
                      ? "bg-red-200 text-red-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-gray-700 mb-3">
                <p>
                  <strong>Total Amount:</strong>{" "}
                  <span className="text-amber-900 font-bold">
                    Rs. {order.totalAmount}
                  </span>
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Items Ordered:</p>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.menu.name} × {item.quantity} —{" "}
                      <span className="text-amber-800">Rs. {item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
