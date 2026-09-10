import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const Pizzas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const [pageNumber, setPageNumber] = useState(0);

  const allCategories = ["ALL", ...new Set(products.map((item) => item.category.toUpperCase()))];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "ALL" || item.category.toUpperCase() === category;
    return matchesSearch && matchesCategory;
  });

  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = filteredProducts.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(filteredProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="Menu">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-4 mt-5">
            <h2 className="fw-bold">Explore Our Menu</h2>
          </Col>

          <Col lg="12" className="mb-5">
            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPageNumber(0); }}
                  style={{
                    padding: "7px 20px",
                    border: "none",
                    borderRadius: "20px",
                    background: category === cat ? "var(--primary-color)" : "var(--accent-color)",
                    color: category === cat ? "var(--white)" : "var(--secondary-color)",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "0.3s"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Col>

          <Col lg="12" className="mb-5">
            <div className="search__widget d-flex align-items-center justify-content-between w-50 mx-auto">
              <input
                type="text"
                placeholder="Search for your favorite food..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPageNumber(0); }}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  border: "1px solid var(--accent-color)",
                  borderRadius: "30px",
                  outline: "none",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                }}
              />
              <span style={{ marginLeft: "-45px" }}>
                <i className="ri-search-line" style={{ color: "var(--primary-color)", fontSize: "1.2rem" }}></i>
              </span>
            </div>
          </Col>

          {displayPage.length > 0 ? (
            displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))
          ) : (
            <Col lg="12" className="text-center mt-5">
              <h5 className="fw-bold">No items found in this category.</h5>
            </Col>
          )}

          <Col lg="12">
            <div className="d-flex justify-content-center mt-4 mb-4">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName="paginationBttns"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Pizzas;
