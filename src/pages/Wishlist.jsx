import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { wishlistActions } from "../store/shopping-cart/wishlistSlice";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import "../styles/cart-page.css";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(wishlistActions.toggleWishlist({ id }));
  };

  const addToCart = (item) => {
    dispatch(cartActions.addItem(item));
    // Optional: remove from wishlist after adding to cart
    // dispatch(wishlistActions.toggleWishlist({ id: item.id }));
  };

  return (
    <Helmet title="Wishlist">
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {wishlistItems.length === 0 ? (
                <h5 className="text-center">Your wishlist is empty</h5>
              ) : (
                <>
                  <h5 className="mb-4">Your Favorites</h5>
                  <Table bordered className="text-center">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map((item) => (
                        <tr key={item.id}>
                          <td className="cart__img-box">
                            <img src={item.image01} alt="" />
                          </td>
                          <td>{item.title}</td>
                          <td>${item.price}</td>
                          <td>
                            <button
                              className="addTOCart__btn"
                              onClick={() => addToCart(item)}
                            >
                              Add to Cart
                            </button>
                          </td>
                          <td className="cart__item-del">
                            <i
                              className="ri-delete-bin-line"
                              onClick={() => deleteItem(item.id)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <div className="mt-4">
                <Link to="/foods" className="addTOCart__btn">
                  Back to Menu
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Wishlist;
