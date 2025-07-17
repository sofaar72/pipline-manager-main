import Sidebar from "../components/Sidebar";

const LayoutOne = ({ children }) => {
  return (
    <div className="w-full h-screen flex gap-[30px] justify-between overflow-hidden max-width ">
      <Sidebar />
      <div className="w-full h-full flex-1 g-padd overflow-x-hidden  px-[30px] py-[30px]">
        {children}
      </div>
    </div>
  );
};

export default LayoutOne;
