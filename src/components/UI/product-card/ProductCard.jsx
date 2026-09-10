import React from "react";

import "../../../styles/product-card.css";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { cartNotificationActions } from "../../../store/shopping-cart/cartNotificationSlice";
import { wishlistActions } from "../../../store/shopping-cart/wishlistSlice";

import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, title, image01, price, extraIngredients } = props.item;
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
        extraIngredients
      })
    );
    dispatch(cartNotificationActions.showNotification("Added to cart"));
  };

  const toggleWishlist = () => {
    dispatch(
      wishlistActions.toggleWishlist({
        id,
        title,
        image01,
        price,
      })
    );
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between">
      <div className="product__content text-end">
        <span
          onClick={toggleWishlist}
          style={{ cursor: "pointer", fontSize: "1.2rem", color: isWishlisted ? "var(--primary-color)" : "var(--secondary-color)" }}
        >
          <i className={isWishlisted ? "ri-heart-fill" : "ri-heart-line"}></i>
        </span>
        <div className="text-center">
          <img className="product__img w-50" src={image01} alt="Food Item" />
          <h5>
            <Link to={`/foods/${id}`}>{title}</Link>
          </h5>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">{price} € </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
