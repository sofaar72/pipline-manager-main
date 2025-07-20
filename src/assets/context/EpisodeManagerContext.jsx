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
  const [globalActiveEntity, setGlobalActiveEntity] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState("Episode 1");
  const [activeTask, setActiveTask] = useState(null);
  const [activeVersion, setActiveVersion] = useState(null);

  const selectEpisode = (ep) => {
    setSelectedEpisode(ep);
  };

  const values = {
    selectEpisode,
    selectedEpisode,
    activeTask,
    setActiveTask,
    activeVersion,
    setActiveVersion,
    globalActiveEntity,
    setGlobalActiveEntity,
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
