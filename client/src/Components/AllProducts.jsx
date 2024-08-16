import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const url = `${process.env.REACT_APP_API_URL}/products`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const addTocart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const url = `${process.env.REACT_APP_API_URL}/addtocart`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <div className="d-flex   flex-wrap ">
        {products &&
          products.map((elem, ind) => (
            <Col key={ind}>
              <Card
                className="mx-auto"
                style={{
                  width: "18rem",
                }}
              >
                <img alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardTitle tag="h5">{elem.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Card subtitle
                  </CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card‘s content.
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
