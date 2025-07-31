import React from "react";
import LoginWelcome from "../components/login/LoginWelcome";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex">
      {/* max-width */}
      {/* wrapper  */}
      <div className="w-full h-full flex flex-col lg:flex-row">
        <LoginWelcome />

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
