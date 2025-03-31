import React from "react";
import SideNavBar from "../components/SideNavBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1">
       
        {/* Page Content */}
        <main className="p-6 mt-16 ml-64">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;