import React, { useEffect, useState } from "react";

import TheButton from "../TheButton";
import Loading from "../../golbals/Loading";

const PreviewLoading = ({}) => {
  return (
    <div className="w-full h-full radius bg-[var(--overview-color-one)] text-white h-xl flex items-center justify-center p-2 shrink-0 flex-col ">
      <div className="w-full flex justify-center gap-4 px-2">
        <span className="text-lg">Loading ...</span>
        <Loading size={"w-8 h-8"} color="fill-[var(--overview-color-four)]" />
      </div>
    </div>
  );
};

export default PreviewLoading;
