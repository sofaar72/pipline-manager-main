import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is imported!

const ToastBox = ({ message, type = "default" }) => {
  useEffect(() => {
    if (!message) return;

    switch (type) {
      case "error":
        toast.error(message);
        break;
      case "alert":
        toast.warn(message); // yellow
        break;
      case "success":
        toast.success(message); // green
        break;
      default:
        toast(message); // default color
    }
  }, [message, type]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      // theme="colored"
    />
  );
};

export default ToastBox;
