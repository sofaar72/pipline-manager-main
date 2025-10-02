import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";

const LayoutOne = ({ children }) => {
  return (
    <div className="w-full h-screen flex gap-[10px]  py-[10px] justify-between overflow-hidden max-width ">
      <ToastContainer style={{ zIndex: "9999999999999999999999999999 " }} />
      <Sidebar />
      <div className="w-full h-full flex-1 g-padd overflow-x-hidden  px-2 py-2">
        {children}
      </div>
    </div>
  );
};

export default LayoutOne;
