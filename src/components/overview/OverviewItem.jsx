const OverviewItem = ({
  isOdd,
  children,
  type = "default",
  isChecked = false,
}) => {
  if (type === "default") {
    return (
      <div
        className={` w-full p-0 ${isOdd ? "bg-[#35305C]" : " bg-[#000000]"} ${
          isChecked && "!bg-[var(--third-normal)]/50"
        }`}
      >
        {children}
      </div>
    );
  }
  if (type === "light") {
    return (
      <div className={` w-full p-0  bg-[var(--light)]/50`}>{children}</div>
    );
  }
  if (type === "animate") {
    return (
      <div className={` w-full p-0  bg-[var(--animate)]/50`}>{children}</div>
    );
  }
  if (type === "modeling") {
    return (
      <div className={` w-full p-0  bg-[var(--modeling)]/50`}>{children}</div>
    );
  }
  if (type === "texturing") {
    return (
      <div className={` w-full p-0  bg-[var(--texturing)]/50`}>{children}</div>
    );
  }
  if (type === "rigging") {
    return (
      <div className={` w-full p-0  bg-[var(--rigging)]/50`}>{children}</div>
    );
  }
  if (type === "shading") {
    return (
      <div className={` w-full p-0  bg-[var(--shading)]/50`}>{children}</div>
    );
  }
};

export default OverviewItem;
