import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PreviewPage from "../pages/PreviewPage";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import EmptyPage from "../pages/EmptyPage";

import { AuthProvider } from "../assets/context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";
import FilesContent from "../components/FilesContent";
import ProjectTaskManager from "../pages/ProductionTaskManager";
import ProductionTaskManager from "../pages/ProductionTaskManager";
import AssetsTaskManager from "../pages/AssetsTaskManager";
import CreateProjectPage from "../pages/Projects/CreateProjectPage";

const AllRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>
            }
          >
            <Route
              path="create"
              element={
                <PrivateRoute>
                  <CreateProjectPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <EmptyPage title="Users Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/register-configs"
            element={
              <PrivateRoute>
                <EmptyPage title="Register Configs Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <EmptyPage title="Settings Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <EmptyPage title="Dashboard Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/overview"
            element={
              <PrivateRoute>
                <EmptyPage title="Overview Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/gun-chart"
            element={
              <PrivateRoute>
                <EmptyPage title="Gun Chart Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/productivity"
            element={
              <PrivateRoute>
                <EmptyPage title="Productivity Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <EmptyPage title="User Profile Page" />
              </PrivateRoute>
            }
          />
          <Route
            path="/task-manager/production"
            element={
              <PrivateRoute>
                <ProductionTaskManager />
              </PrivateRoute>
            }
          >
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <FilesContent />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/task-manager/assets"
            element={
              <PrivateRoute>
                <AssetsTaskManager />
              </PrivateRoute>
            }
          >
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <FilesContent />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="/task-manager/preview"
            element={
              <PrivateRoute>
                <PreviewPage />
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
