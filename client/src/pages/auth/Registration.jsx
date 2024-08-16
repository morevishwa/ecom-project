import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      address: data.get("address"),
      name: data.get("name"),
      isManager: data.get("isManager") == "true" ? true : false,
      phone: data.get("phone"),
    };

    // console.log("handleSubmit  payload:", payload);
    const url = `${process.env.REACT_APP_API_URL}/user/register`;
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
      navigate("/login");
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
                  <Label for="name">Name</Label>
                  <Input id="name" name="name" placeholder="Name" type="text" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    type="number"
                  />
                </FormGroup>
              </Col>{" "}
            </Row>
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
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleAddress">Address</Label>
                  <Input
                    id="exampleAddress"
                    name="address"
                    placeholder="1234 Main St"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Label>User Type</Label>
                <div className="d-flex gap-4">
                  <FormGroup check>
                    <Input name="isManager" type="radio" value={true} />{" "}
                    <Label check>Manager</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      name="isManager"
                      defaultChecked
                      type="radio"
                      value={false}
                    />{" "}
                    <Label check>User</Label>
                  </FormGroup>
                </div>
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

export default Registration;
