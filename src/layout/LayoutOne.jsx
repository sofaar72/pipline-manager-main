import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";

const LayoutOne = ({ children }) => {
  return (
    <div className="w-full h-screen flex gap-[10px]  py-[10px] justify-between overflow-hidden max-width ">
      <Sidebar />
      <div className="w-full h-full flex-1 g-padd overflow-x-hidden  px-2 py-2">
        <ToastContainer
          style={{
            zIndex: "9999999999999999999999999999 ",
            overflow: "hidden",
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default LayoutOne;
