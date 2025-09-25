import React from "react";
import LoginWelcome from "../components/login/LoginWelcome";
import LoginForm from "../components/login/LoginForm";
import { useMediaQuery } from "react-responsive";

const LoginPage = () => {
  const isSmallView = useMediaQuery({ maxWidth: 1400 });
  return (
    <div className="w-full h-full flex relative">
      {/* max-width */}
      {/* wrapper  */}

      <div
        className={`w-full h-full  absolute top-0 left-0 z-[1] ${
          !isSmallView ? "opacity-100" : "opacity-20"
        }`}
      >
        <LoginWelcome isSmallView={isSmallView} />
      </div>
      <div className="w-full h-full flex items-center justify-center relative z-[2]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
