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
  const [selectedEntity, setSelectedEntity] = useState("All");
  const [selectedEpisode, setSelectedEpisode] = useState("Episode 1");
  const [activeEntity, setActiveEntity] = useState();
  const [activeTask, setActiveTask] = useState(null);
  const [activeVersion, setActiveVersion] = useState(null);

  const selectEntity = (ent) => {
    setSelectedEntity(ent);
  };
  const selectEpisode = (ep) => {
    setSelectedEpisode(ep);
  };

  const values = {
    selectedEntity,
    selectEntity,
    selectEpisode,
    selectedEpisode,
    activeEntity,
    setActiveEntity,
    activeTask,
    setActiveTask,
    activeVersion,
    setActiveVersion,
  };

  useEffect(() => {
    console.log(selectedEntity);
  }, [selectedEntity]);

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
