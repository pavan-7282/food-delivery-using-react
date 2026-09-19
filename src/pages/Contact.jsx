import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Temporary frontend submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        type: "success",
        message:
          "Message sent successfully! We'll get back to you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!status.message) return;

    const timer = setTimeout(() => {
      setStatus({
        type: "",
        message: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [status.message]);

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact Us" />

      <section className="contact__section">
        <Container>
          <div className="contact__wrapper">

            {/* ================================
                LEFT CONTENT
            ================================= */}

            <div className="contact__left">

              <div className="contact__eyebrow">
                <span></span>
                GET IN TOUCH
              </div>

              <h1 className="contact__heading">
                We'd Love To
                <span>Hear From You</span>
              </h1>

              <p className="contact__description">
                Have a question about our menu, delivery, or your order?
                Our friendly team is always ready to help. Send us a
                message and we'll get back to you as soon as possible.
              </p>

              {/* Contact Cards */}

              <div className="contact__details">

                {/* Location */}
                <div className="contact__detail">
                  <div className="contact__detail-icon">
                    <i className="ri-map-pin-2-fill"></i>
                  </div>

                  <div>
                    <span>VISIT US</span>
                    <h6>Our Location</h6>
                    <p>
                      123 Foodie Street,
                      <br />
                      Gourmet City
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact__detail">
                  <div className="contact__detail-icon">
                    <i className="ri-phone-fill"></i>
                  </div>

                  <div>
                    <span>CALL US</span>
                    <h6>Phone Number</h6>
                    <p>
                      <a href="tel:+1234567890">
                        +1 (234) 567-890
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact__detail">
                  <div className="contact__detail-icon">
                    <i className="ri-mail-fill"></i>
                  </div>

                  <div>
                    <span>EMAIL US</span>
                    <h6>Email Address</h6>
                    <p>
                      <a href="mailto:support@fastbite.com">
                        support@fastbite.com
                      </a>
                    </p>
                  </div>
                </div>

              </div>

              {/* Response badge */}

              <div className="contact__response">
                <div className="contact__online-dot"></div>

                <div>
                  <strong>We're here to help</strong>
                  <p>Usually respond within 24 hours</p>
                </div>
              </div>

            </div>


            {/* ================================
                RIGHT FORM
            ================================= */}

            <div className="contact__right">

              <div className="contact__form-card">

                {/* Decorative top */}
                <div className="contact__form-glow"></div>

                <div className="contact__form-header">
                  <div>
                    <span className="contact__form-label">
                      CONTACT US
                    </span>

                    <h2>Send Us A Message</h2>

                    <p>
                      Have something on your mind? We'd love to hear from
                      you.
                    </p>
                  </div>

                  <div className="contact__form-icon">
                    <i className="ri-send-plane-fill"></i>
                  </div>
                </div>


                <Form onSubmit={handleSubmit} noValidate>

                  {/* Name + Email */}

                  <div className="contact__form-grid">

                    <div className="contact__field">
                      <label htmlFor="name">
                        Your Name
                      </label>

                      <div className="contact__input-box">
                        <i className="ri-user-3-line"></i>

                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="name"
                        />
                      </div>
                    </div>


                    <div className="contact__field">
                      <label htmlFor="email">
                        Email Address
                      </label>

                      <div className="contact__input-box">
                        <i className="ri-mail-line"></i>

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                  </div>


                  {/* Subject */}

                  <div className="contact__field">
                    <label htmlFor="subject">
                      Subject
                    </label>

                    <div className="contact__input-box">
                      <i className="ri-chat-1-line"></i>

                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What can we help you with?"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>


                  {/* Message */}

                  <div className="contact__field">
                    <div className="contact__label-row">
                      <label htmlFor="message">
                        Message
                      </label>

                      <span>
                        Tell us more
                      </span>
                    </div>

                    <div className="contact__textarea-box">
                      <i className="ri-message-3-line"></i>

                      <Input
                        id="message"
                        name="message"
                        type="textarea"
                        rows="6"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>


                  {/* Status */}

                  {status.message && (
                    <div
                      className={`contact__alert ${
                        status.type === "success"
                          ? "contact__alert-success"
                          : "contact__alert-error"
                      }`}
                    >
                      <i
                        className={
                          status.type === "success"
                            ? "ri-checkbox-circle-fill"
                            : "ri-error-warning-fill"
                        }
                      ></i>

                      <span>{status.message}</span>
                    </div>
                  )}


                  {/* Submit */}

                  <Button
                    type="submit"
                    className="contact__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="contact__spinner"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="contact__submit-icon">
                          <i className="ri-arrow-right-line"></i>
                        </span>
                      </>
                    )}
                  </Button>


                  <div className="contact__privacy">
                    <i className="ri-shield-check-line"></i>
                    Your information is safe with us.
                  </div>

                </Form>

              </div>

            </div>

          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;