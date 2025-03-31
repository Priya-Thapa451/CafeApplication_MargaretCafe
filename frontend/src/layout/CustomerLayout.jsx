import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomerNavbar from "../components/CustomerNavBar";

export default function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />

      <Outlet />
      {/* <Footer /> */}
    </>
  );
}