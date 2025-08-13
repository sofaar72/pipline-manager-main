// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../layout/LayoutOne";
import Lottie from "lottie-react";
import animationData from "../assets/lotties/Suci_the_Ghost.json";

const NotFound = () => {
  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <div className="w-full h-full justify-center text-center items-center flex radius ">
          <div className="w-full max-w-[500px] bg-[var(--primary-color-light)]/20 flex flex-col gap-2 items-center justify-center p-4 radius">
            <div className="w-full  bg-[var(--primary-color-light)]/20 h-[100px] radius flex justify-center items-center cursor-pointer hover:bg-[var(--primary-color-light)] transition-all duration-300">
              <Link
                to="/file-manager/production"
                className="text-white underline w-full h-full flex justify-center items-center"
              >
                Page not Found Go back to Task Manager
              </Link>
            </div>
            <Lottie
              className="w-[200px] h-[300px] animate-pulse "
              animationData={animationData}
              loop={true}
            />
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};

export default NotFound;
