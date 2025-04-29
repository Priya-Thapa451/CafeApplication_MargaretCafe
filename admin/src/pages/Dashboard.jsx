import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import RecentOrder from "../components/RecentOrder";
import OrderChart from "../components/OrderChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalAppointments: 0,
    orderGraph: [],
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard/stat",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
        setRecentOrders(res.data.recentOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center p-6 text-brown-600 font-medium">Loading your dashboard...</p>;

  return (
    <div className="p-8 bg-[#FFF8F0] min-h-screen">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-[#A9746E]" // soft coffee brown
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-[#6B8E23]" // muted green
        />
        <StatCard
          title="Total Menu"
          value={stats.totalProducts}
          color="bg-[#D4A373]" // soft light brown
        />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#5C4033] mb-4">Recent Orders</h2>
          <RecentOrder orders={recentOrders} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#5C4033] mb-4">Order Trend</h2>
          <OrderChart data={stats.orderGraph} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
