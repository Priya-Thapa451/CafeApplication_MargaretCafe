import React from "react";
import SideNavBar from "../components/SideNavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-4">
        {/* Page Content */}
        <main className="p-6 mt-16 ml-64 bg-gray-50 rounded-lg shadow-lg">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
