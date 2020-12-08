import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function LoginForm() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
  };
  const [showPass, setShowPass] = useState(false);

  return (
    <Form onSubmit={onSubmit}>
      <h4>LOGIN</h4>
      <Form.Group controlId="formBasicEmail">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="email" placeholder="Email" name="email" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          type={showPass ? "text" : "password"}
          placeholder="Password"
          name="password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="show password"
          onClick={() => setShowPass(!showPass)}
        />
      </Form.Group>
      {/* <div> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
