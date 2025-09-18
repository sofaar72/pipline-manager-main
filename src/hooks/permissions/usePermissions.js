// hooks/usePermissions.js
import { useState, useEffect } from "react";
import { getCurrentUserPermissions, getCurrentUserRole } from "./permissions";

export const usePermissions = () => {
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const role = getCurrentUserRole();
    const permissions = getCurrentUserPermissions();

    setUserRole(role);
    setUserPermissions(permissions);
  }, []);

  return {
    userRole,
    userPermissions,
    hasPermission: (permission) => userPermissions.includes(permission),
    hasAnyPermission: (permissions) =>
      permissions.some((p) => userPermissions.includes(p)),
    hasAllPermissions: (permissions) =>
      permissions.every((p) => userPermissions.includes(p)),
    hasRole: (role) => userRole === role,
    hasAnyRole: (roles) => roles.includes(userRole),
  };
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    // console.log(userData);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await axiosInstance.post("/auth/login/", {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200) {
        // console.log("Login response:", response.data);

        // Store authentication tokens
        if (response.data.access && response.data.refresh) {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
        }

        // Handle role data with improved logic
        if (response.data.user?.role) {
          const roleData = response.data.user.role;

          if (typeof roleData === "object") {
            // Store complete role object
            localStorage.setItem("role", JSON.stringify(roleData));
            localStorage.setItem("role_id", roleData.id);
            localStorage.setItem("role_name", roleData.name);
          } else if (typeof roleData === "string") {
            // Store role as string
            localStorage.setItem("role", roleData);
            localStorage.setItem("role_name", roleData);
          }
        }

        // Store additional user info
        if (response.data.user) {
          localStorage.setItem("user_id", response.data.user.id);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("user_data", JSON.stringify(response.data.user));
        }

        return response.data;
      }
    } catch (error) {
      // console.log("Login error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// ===========================
// 6. USAGE EXAMPLES
// ===========================

// Example 1: Using PermissionGuard in components
const ExampleComponent = () => {
  return (
    <div>
      {/* Show create button only for users with create permission */}
      <PermissionGuard permission={PERMISSIONS.CREATE_ENTITY}>
        <button>Create Entity</button>
      </PermissionGuard>

      {/* Show admin panel only for admins */}
      <PermissionGuard role={ROLES.ADMIN}>
        <AdminPanel />
      </PermissionGuard>

      {/* Show for multiple roles */}
      <PermissionGuard roles={[ROLES.ADMIN, ROLES.MANAGER]}>
        <ManagementSection />
      </PermissionGuard>

      {/* Show with fallback */}
      <PermissionGuard
        permission={PERMISSIONS.VIEW_ANALYTICS}
        fallback={<div>Access denied</div>}
      >
        <AnalyticsPage />
      </PermissionGuard>
    </div>
  );
};

// Example 2: Using usePermissions hook
const NavigationMenu = () => {
  const { hasPermission, hasRole } = usePermissions();

  return (
    <nav>
      <a href="/dashboard">Dashboard</a>

      {hasPermission(PERMISSIONS.VIEW_USERS) && <a href="/users">Users</a>}

      {hasPermission(PERMISSIONS.CREATE_PROJECT) && (
        <a href="/projects/new">New Project</a>
      )}

      {hasRole(ROLES.ADMIN) && <a href="/admin">Admin Panel</a>}
    </nav>
  );
};

// Example 3: Using permission functions directly
const handleDeleteEntity = (entityId) => {
  if (!hasPermission(PERMISSIONS.DELETE_ENTITY)) {
    alert("You don't have permission to delete entities");
    return;
  }

  // Proceed with deletion
  deleteEntity(entityId);
};

// Example 4: Route protection (with React Router)
const ProtectedRoute = ({ children, permission, role }) => {
  const hasAccess = permission ? hasPermission(permission) : hasRole(role);

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
