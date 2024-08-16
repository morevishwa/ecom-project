import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const setAuthToken = (token) => {
    localStorage.setItem("token", token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // console.log("handleSubmit  payload:", payload);
    const url = `${process.env.REACT_APP_API_URL}/user/login`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const resData = await res.json();

    console.log("handleSubmit  resData:", resData);
    if (resData.success) {
      setAuthToken(resData.token);

      //   const fetchCart = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/user/getuserdetails?token=${resData.token}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${resData.token}`,
          },
        });
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } catch (error) {
        console.log("Error fetching products:", error);
      }
      //   };
    }
  };
  return (
    <div>
      <Row className="mt-4">
        <Col md={4}></Col>
        <Col md={4}>
          {" "}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="mx-auto d-flex justify-content-center align-content-center align-align-items-center   ">
              {" "}
              <Button type="submit">Sign in</Button>
            </div>
          </Form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default Login;
