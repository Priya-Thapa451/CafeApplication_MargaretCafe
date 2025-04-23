import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Utensils,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

const SideNavBar = () => {
  const handleLogout = () => {
    // Example logout logic (replace with your own)
    console.log("Logging out...");
    // e.g., localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <aside className="bg-[#3b1f1b] text-white w-64 fixed h-full shadow-lg flex flex-col justify-between">
      {/* Top: Logo and Menu */}
      <div>
        <div className="p-6 border-b border-[#5a3c36]">
          <h2 className="text-2xl font-bold font-serif tracking-wide text-center">
            Margaret Cafe
          </h2>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-md hover:bg-[#5a3c36] rounded-md transition duration-300"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/add/menu"
                className="flex items-center gap-3 px-4 py-3 text-md hover:bg-[#5a3c36] rounded-md transition duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                Add Menu
              </Link>
            </li>
            <li>
              <Link
                to="/menu/list"
                className="flex items-center gap-3 px-4 py-3 text-md hover:bg-[#5a3c36] rounded-md transition duration-300"
              >
                <List className="w-5 h-5" />
                Menu List
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="flex items-center gap-3 px-4 py-3 text-md hover:bg-[#5a3c36] rounded-md transition duration-300"
              >

                <ShoppingCart className="w-5 h-5" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 text-md hover:bg-[#5a3c36] rounded-md transition duration-300"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom: Logout */}
      <div className="mb-6 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-md text-white hover:bg-[#5a3c36] rounded-md transition duration-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;
