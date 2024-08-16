import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import Cart from "../../Components/Cart";
import AllProducts from "../../Components/AllProducts";
import { Button, Col, Container, Row } from "reactstrap";

const Home = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={9} style={{ background: "#cce5ff", height: "100vh" }}>
            {/* Content for the div taking up 80% width */}
            <h1>All Products</h1>
            <AllProducts />
          </Col>
          <Col md={3} style={{ background: "#f8d7da", height: "100vh" }}>
            {/* Content for the div taking up 20% width */}
            <h1>Cart</h1>
            <Cart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
