// context/GlobalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const EpisodeManagerContext = createContext();

export const EpisodeManagerProvider = ({ children }) => {
  const [dataType, setDataType] = useState("production");

  const [globalCurrentPage, setGlobalCurrentPage] = useState(1);
  const [globalActiveEntity, setGlobalActiveEntity] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState("Episode 1");
  const [activeEntity, setActiveEntity] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [activeVersion, setActiveVersion] = useState(null);

  const selectEpisode = (ep) => {
    setSelectedEpisode(ep);
  };

  const values = {
    selectEpisode,
    selectedEpisode,
    activeEntity,
    setActiveEntity,
    activeTask,
    setActiveTask,
    activeVersion,
    setActiveVersion,
    globalActiveEntity,
    setGlobalActiveEntity,
    dataType,
    setDataType,
    globalCurrentPage,
    setGlobalCurrentPage,
  };

  return (
    <EpisodeManagerContext.Provider value={values}>
      {children}
    </EpisodeManagerContext.Provider>
  );
};

// Custom Hook
export const useEpisodeManagerContext = () => {
  const context = useContext(EpisodeManagerContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
