import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./Components/Footer.css/Footer.jsx";
import LoginPopUp from "./Components/Loginpopup/LoginPopUp.jsx";
import Verify from "./Pages/Verify/Verify.jsx";
import Myorders from "./Pages/Myorders/Myorders.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import PaymentOption from "./Pages/PaymentOptions/PaymentOption.jsx";
import Bottom_navbar from "./Components/BottomNavbar/Bottom_navbar.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import { useContext } from "react";
import StoreContext from "./Context/StoreContext.jsx";
import ScrollTotop from "./Components/ScrollTotop/ScrollTotop.jsx";
import GoToTop from "./Components/GoTotop/GoToTop.jsx";

const App = () => {
  const {showLogin, setShowLogin} = useContext(StoreContext);
  return (
    <>
      <ScrollTotop />
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/paymentoptions" element={<PaymentOption />} />
          {/* Add more routes as needed */}
        </Routes>
        <GoToTop/>
        <Bottom_navbar />
        {/* Toast Container for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
