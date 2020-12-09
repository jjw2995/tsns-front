import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { Button } from "react-bootstrap";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {isLogin && <LoginForm />}
      {!isLogin && <RegisterForm />}
      <div className="mt-4">
        <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create New Account" : "Have Account? Login"}
        </Button>
      </div>
    </div>
  );
}

export default Auth;
