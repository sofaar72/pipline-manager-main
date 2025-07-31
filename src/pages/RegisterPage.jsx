import React from "react";
import LoginWelcome from "../components/login/LoginWelcome";
import RegisterFrom from "../components/login/RegisterFrom";

const RegisterPage = () => {
  return (
    <div className="w-full h-full flex">
      {/* max-width */}
      {/* wrapper  */}
      <div className="w-full h-full flex flex-col lg:flex-row">
        <LoginWelcome />

        <RegisterFrom />
      </div>
    </div>
  );
};

export default RegisterPage;
