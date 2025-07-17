import React from "react";
import CreateTaskForm from "./CreateTaskForm";

const NoTask = () => {
  return (
    <div className="w-full h-full radius relative overflow-hidden">
      <div className="absolute w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="/images/NoTaskBg.svg"
          alt=""
        />
      </div>
      {/* content  */}
      <div className="w-full h-full sec-padd flex items-center justify-center absolute z-20">
        <div className="w-full max-w-[400px] h-full  max-h-[540px] ">
          <CreateTaskForm />
        </div>
      </div>
    </div>
  );
};

export default NoTask;
