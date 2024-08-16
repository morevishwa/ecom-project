import React, { useEffect, useState } from "react";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const url = `${process.env.REACT_APP_API_URL}/cart/${user._id}`;
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
    // Fetch all products from the server

    fetchCart();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <div>Cart</div>;
};

export default Cart;
