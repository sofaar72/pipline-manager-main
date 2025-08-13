import React from "react";
import { useEntities } from "../../hooks/useEntities";
import Loading from "../golbals/Loading";
import { ToastContainer } from "react-toastify";

const DeleteEntityModal = ({ id, closeModal }) => {
  const { deleteFilmEntity, deleteLoading } = useEntities();

  const deleteEnt = () => {
    deleteFilmEntity(id, closeModal);
  };
  return (
    <>
      <div className="w-full h-full radius p-4 form-bg text-white pt-8 flex flex-col gap-2 justify-between">
        <span>Are You sure yoou want to remove this entity?</span>
        <div className="flex w-full items-center justify-between">
          <button
            className="cursor-pointer bg-[var(--secondary-normal)]/50 hover:bg-[var(--secondary-normal)] min-w-[100px] radius transition p-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer bg-[var(--primary-color-lower)]/50 hover:bg-[var(--primary-color-lower)] min-w-[100px] radius transition p-2 relative"
            onClick={deleteEnt}
            disabled={deleteLoading}
          >
            <span> Ok</span>
            {deleteLoading && (
              <span className="absolute right-4 top-1/2 translate-y-[-50%]">
                {<Loading size={"w-[10px]"} />}
              </span>
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteEntityModal;
