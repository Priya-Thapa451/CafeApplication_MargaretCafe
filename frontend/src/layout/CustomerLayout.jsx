import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomerNavbar from "../components/CustomerNavBar";
import Footer from "../components/Footer";

export default function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />

      <Outlet />
      {/* <Footer /> */}
      <Footer/>
    </>
  );
}