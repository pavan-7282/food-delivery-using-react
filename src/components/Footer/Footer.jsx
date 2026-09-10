import React from "react";
import { ListGroup } from "reactstrap";

import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>FastBite</h5>
        <p>Delicious food delivered straight to your doorstep, fresh and fast!</p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Delivery Time</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Monday - Friday</span>
            <p>09:00am - 10:00pm</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Saturday - Sunday</span>
            <p>10:00am - 11:00pm</p>
          </div>
        </ListGroup>
      </div>
      <div>
        <h5 className="footer__title mb-3">Contact</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Location:</span>
            <p>123 Street, Food City</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Phone:</span>
            <p>+123 456 7890</p>
          </div>
        </ListGroup>
      </div>
    </footer>
  );
};

export default Footer;
