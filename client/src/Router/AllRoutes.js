import { Routes, Route } from "react-router-dom";
import React from "react";
import Registration from "../pages/auth/Registration";
import Login from "../pages/auth/login";
import Home from "../pages/home/Home";
const AllRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/registartion" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/productlisting" element={<ProductListing />}></Route> */}
      </Routes>
    </>
  );
};

export default AllRoute;
