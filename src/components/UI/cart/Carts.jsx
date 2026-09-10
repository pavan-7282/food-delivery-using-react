import React from "react";

import { ListGroup } from "reactstrap";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { cartNotificationActions } from "../../../store/shopping-cart/cartNotificationSlice";
import { useNavigate } from "react-router-dom";

import "../../../styles/shopping-cart.css";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const placeOrder = () => {
    if (!cartProducts.length) return;

    if (!user) {
      toggleCart();
      navigate("/login");
      return;
    }

    dispatch(cartActions.clearCart());
    toggleCart();
    dispatch(
      cartNotificationActions.showNotification("Order placed successfully")
    );
  };
  return (
    <div className="cart__container" onClick={toggleCart}>
      <ListGroup onClick={(event) => event.stopPropagation()} className="cart">
        <div className="cart__closeButton">
          <span onClick={toggleCart}>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} onClose={toggleCart}/>
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>${totalAmount}</span>
          </h6>
          <button
            type="button"
            onClick={placeOrder}
            disabled={!cartProducts.length}
            className="cart__order-btn"
          >
            <span>{user ? "Book Order" : "Sign in to order"}</span>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
