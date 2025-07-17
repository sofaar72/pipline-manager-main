import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TaskManager from "../pages/TaskManager";
import LoginPage from "../pages/LoginPage";

import { AuthProvider } from "../assets/context/AuthContext";
import PrivateRoute from "./PrivateRoute"; // Adjust path if needed
import PublicRoute from "./PublicRoutes";

const AllRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/task-manager/production"
            element={
              <PrivateRoute>
                <TaskManager />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AllRoutes;
