import { useEffect, useState } from "react";
import "./App.css";

import AllRoutes from "./Routes/AllRoutes";
import { EpisodeManagerProvider } from "./assets/context/EpisodeManagerContext";

function App() {
  useEffect(() => {
    // ✅ Set token to localStorage (set a dummy or real value)
    const tokenKey = import.meta.env.VITE_API_TOKEN || "token";
    const tokenValue = "token"; // Replace with actual token or logic
    // localStorage.setItem(tokenKey, tokenValue);
  }, []);

  return (
    <div className="bg-glob">
      <EpisodeManagerProvider>
        <div className="w-full flex gap-[31px] justify-between h-screen">
          <AllRoutes />
        </div>
      </EpisodeManagerProvider>
    </div>
  );
}

export default App;
