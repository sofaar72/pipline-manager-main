import Sidebar from "../components/Sidebar";

const LayoutOne = ({ children }) => {
  return (
    <div className="w-full h-screen flex gap-[10px]  py-[10px] justify-between overflow-hidden max-width ">
      <Sidebar />
      <div className="w-full h-full flex-1 g-padd overflow-x-hidden  px-2 py-2">
        {children}
      </div>
    </div>
  );
};

export default LayoutOne;
