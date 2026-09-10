import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import CartNotification from "../UI/cart/CartNotification.jsx";

import { useSelector } from "react-redux";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Header />
      <CartNotification />
      {showCart && <Carts />}
      <div className="main__content">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
