import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartNotificationActions } from "../../../store/shopping-cart/cartNotificationSlice";
import "../../../styles/cart-notification.css";

const CartNotification = () => {
  const dispatch = useDispatch();
  const { message, visible } = useSelector((state) => state.cartNotification);

  useEffect(() => {
    if (!visible) return undefined;

    const timeoutId = setTimeout(() => {
      dispatch(cartNotificationActions.hideNotification());
    }, 2800);

    return () => clearTimeout(timeoutId);
  }, [dispatch, visible, message]);

  if (!visible) return null;

  return (
    <div className="cart__notification" role="status">
      <i className="ri-checkbox-circle-fill"></i>
      <span>{message}</span>
    </div>
  );
};

export default CartNotification;
