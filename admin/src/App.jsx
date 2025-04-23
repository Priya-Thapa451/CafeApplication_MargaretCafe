import Login from "./pages/Login";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import MenuManagement from "./pages/MenuManagement";
import Dashboard from "./pages/Dashboard";
import AddMenu from "./components/AddMenu";
import MenuList from "./components/MenuList";
import OrderList from "./components/OrderList";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout */}
      <Route  element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add/menu" element={<AddMenu />} />
        <Route path="/menu/list" element={<MenuList />} />
        <Route path="/orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
}