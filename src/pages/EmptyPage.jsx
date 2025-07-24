import React from "react";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import LayoutOne from "../layout/LayoutOne";

const EmptyPage = ({ title }) => {
  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">{title}</h1>
            <p className="text-lg text-gray-500">
              This page is under construction.
            </p>
          </div>
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default EmptyPage;
