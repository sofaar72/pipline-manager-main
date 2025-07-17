import React from "react";

const LoginWelcome = () => {
  return (
    <div className="w-full basis-2/3 h-full relative overflow-hidden">
      <img
        className="absolute w-full h-full object-cover"
        src="/images/login-bg5.svg"
        alt=""
      />
      {/* welcome content part  */}
      <div className="w-full h-full flex items-center relative">
        {/* top layer  */}
        <div className="absolute top-[-100px] left-[-100px] w-[830px] h-[508px] z-10">
          <img
            className="w-full h-full object-cover"
            src="/images/loginTopLayer.svg"
            alt=""
          />
        </div>
        {/* circles  */}
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-b blur-[10px] absolute top-1/2 translate-y-[-50%] left-0 from-[#D7D5FF]/40 to-transparent"></div>
        <div className="w-[174px] h-[174px] rounded-full bg-gradient-to-b blur-[10px] absolute top-[calc(50%-100px)] translate-y-[-50%] left-0 from-[#D7D5FF]/40 to-transparent"></div>
        <div className="w-fit  absolute z-10 p-[50px] text-white flex gap-10">
          <img
            className="w-[64px] h-[94px] object-contain "
            src="/images/welcome-bg.png"
            alt=""
          />
          <div className="flex flex-col gap-[20px] w-[300px] ">
            <h1 className="text-[30px] uppercase font-[700]">
              Welcome To Pipleline Manager
            </h1>
            <p className="text-[15px]">
              project managers, and operations teams aiming to streamline
              complex pipelines with efficiency and clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWelcome;
