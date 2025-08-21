import { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles/createproject.css";
import "./assets/styles/selectproject.css";
import "./assets/styles/ag_grid.css";
import "./assets/styles/overview.css";
import AllRoutes from "./Routes/AllRoutes";
import { EpisodeManagerProvider } from "./assets/context/EpisodeManagerContext";
import { TusClientProvider } from "use-tus";

function App() {
  useEffect(() => {
    // ✅ Set token to localStorage (set a dummy or real value)
    const tokenKey = import.meta.env.VITE_API_TOKEN || "token";
    const tokenValue = "token"; // Replace with actual token or logic
  }, []);

  return (
    <div className="bg-glob">
      <EpisodeManagerProvider>
        <TusClientProvider defaultOptions={{}}>
          <div className="w-full flex gap-[31px] justify-between h-screen">
            <AllRoutes />
          </div>
        </TusClientProvider>
      </EpisodeManagerProvider>
    </div>
  );
}

export default App;
