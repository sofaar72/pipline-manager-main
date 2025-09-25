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
import { PermissionGuard } from "./PermissionGuard";
import FilesContent from "../components/FilesContent";
import ProjectTaskManager from "../pages/ProductionTaskManager";
import ProductionTaskManager from "../pages/ProductionTaskManager";
import AssetsTaskManager from "../pages/AssetsTaskManager";
import CreateProjectPage from "../pages/Projects/CreateProjectPage";
import SelectProjectPage from "../pages/Projects/SelectProjectPage";
import RegisterPage from "../pages/RegisterPage";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import NotFound from "../pages/NotFound";
import UsersPage from "../pages/UsersPage";
import TaskOverviewPage from "../pages/TaskOverviewPage";
import { PERMISSIONS, ROLES } from "../hooks/permissions/permissions";

// Unauthorized component for when user lacks permissions
const UnauthorizedPage = ({
  message = "You don't have permission to access this page.",
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const AllRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes - no permissions needed */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Projects routes - requires VIEW_PROJECTS permission */}
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_PROJECTS}
                  fallback={
                    <UnauthorizedPage message="You need project viewing permissions to access this page." />
                  }
                >
                  <ProjectsPage />
                </PermissionGuard>
              </PrivateRoute>
            }
          >
            <Route
              path="create"
              element={
                <PrivateRoute>
                  <PermissionGuard
                    permission={PERMISSIONS.CREATE_PROJECT}
                    fallback={
                      <UnauthorizedPage message="You need project creation permissions to access this page." />
                    }
                  >
                    <CreateProjectPage />
                  </PermissionGuard>
                </PrivateRoute>
              }
            />
            <Route
              path="select"
              element={
                <PrivateRoute>
                  <PermissionGuard
                    permission={PERMISSIONS.VIEW_PROJECTS}
                    fallback={
                      <UnauthorizedPage message="You need project viewing permissions to access this page." />
                    }
                  >
                    <SelectProjectPage />
                  </PermissionGuard>
                </PrivateRoute>
              }
            />
          </Route>

          {/* Admin/Management routes - requires admin permissions */}
          <Route
            path="/register-configs"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.MANAGE_SETTINGS}
                  fallback={
                    <UnauthorizedPage message="You need settings management permissions to access this page." />
                  }
                >
                  <EmptyPage title="Register Configs Page" />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.MANAGE_SETTINGS}
                  fallback={
                    <UnauthorizedPage message="You need settings management permissions to access this page." />
                  }
                >
                  <EmptyPage title="Settings Page" />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_ANALYTICS}
                  fallback={
                    <UnauthorizedPage message="You need analytics viewing permissions to access this page." />
                  }
                >
                  <EmptyPage title="Dashboard Page" />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* User management - requires VIEW_USERS permission */}
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_USERS}
                  fallback={
                    <UnauthorizedPage message="You need user viewing permissions to access this page." />
                  }
                >
                  <UsersPage />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* Overview - requires content viewing permissions */}
          <Route
            path="/overview"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_CONTENT}
                  fallback={
                    <UnauthorizedPage message="You need content viewing permissions to access this page." />
                  }
                >
                  <TaskOverviewPage />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* Gun chart - requires analytics permissions */}
          <Route
            path="/gun-chart"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_ANALYTICS}
                  fallback={
                    <UnauthorizedPage message="You need analytics viewing permissions to access this page." />
                  }
                >
                  <EmptyPage title="Gun Chart Page" />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* Productivity - requires analytics permissions */}
          <Route
            path="/productivity"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_ANALYTICS}
                  fallback={
                    <UnauthorizedPage message="You need analytics viewing permissions to access this page." />
                  }
                >
                  <EmptyPage title="Productivity Page" />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* User profile - accessible to all authenticated users */}
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <EmptyPage title="User Profile Page" />
              </PrivateRoute>
            }
          />

          {/* File Manager - Production */}
          <Route
            path="/file-manager/production"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permissions={[
                    PERMISSIONS.VIEW_CONTENT,
                    PERMISSIONS.EDIT_CONTENT,
                  ]}
                  fallback={
                    <UnauthorizedPage message="You need content permissions to access the production file manager." />
                  }
                >
                  <ProductionTaskManager />
                </PermissionGuard>
              </PrivateRoute>
            }
          >
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <PermissionGuard
                    permissions={[
                      PERMISSIONS.VIEW_CONTENT,
                      PERMISSIONS.EDIT_CONTENT,
                    ]}
                    fallback={
                      <UnauthorizedPage message="You need content permissions to view these files." />
                    }
                  >
                    <FilesContent />
                  </PermissionGuard>
                </PrivateRoute>
              }
            />
          </Route>

          {/* File Manager - Assets */}
          <Route
            path="/file-manager/assets"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permissions={[
                    PERMISSIONS.VIEW_CONTENT,
                    PERMISSIONS.EDIT_CONTENT,
                  ]}
                  fallback={
                    <UnauthorizedPage message="You need content permissions to access the assets file manager." />
                  }
                >
                  <AssetsTaskManager />
                </PermissionGuard>
              </PrivateRoute>
            }
          >
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <PermissionGuard
                    permissions={[
                      PERMISSIONS.VIEW_CONTENT,
                      PERMISSIONS.EDIT_CONTENT,
                    ]}
                    fallback={
                      <UnauthorizedPage message="You need content permissions to view these files." />
                    }
                  >
                    <FilesContent />
                  </PermissionGuard>
                </PrivateRoute>
              }
            />
          </Route>

          {/* File Preview - requires VIEW_CONTENT permission */}
          <Route
            path="/file-manager/preview/:version_id"
            element={
              <PrivateRoute>
                <PermissionGuard
                  permission={PERMISSIONS.VIEW_CONTENT}
                  fallback={
                    <UnauthorizedPage message="You need content viewing permissions to preview files." />
                  }
                >
                  <PreviewPage />
                </PermissionGuard>
              </PrivateRoute>
            }
          />

          {/* 404 - accessible to all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AllRoutes;
