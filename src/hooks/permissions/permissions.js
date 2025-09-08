// permissions.js
export const ROLES = {
  // SUPER_ADMIN: 'super_admin',
  ADMIN: "admin",
  ARTIST: "artist",
  // EDITOR: 'editor',
  // VIEWER: 'viewer',
  // USER: 'user'
};

export const PERMISSIONS = {
  // User management
  CREATE_USER: "create_user",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",
  VIEW_USERS: "view_users",

  // Content management
  CREATE_CONTENT: "create_content",
  EDIT_CONTENT: "edit_content",
  DELETE_CONTENT: "delete_content",
  PUBLISH_CONTENT: "publish_content",
  VIEW_CONTENT: "view_content",

  // Project management
  CREATE_PROJECT: "create_project",
  EDIT_PROJECT: "edit_project",
  DELETE_PROJECT: "delete_project",
  VIEW_PROJECTS: "view_projects",

  // Entity management
  CREATE_ENTITY: "create_entity",
  EDIT_ENTITY: "edit_entity",
  DELETE_ENTITY: "delete_entity",
  VIEW_ENTITIES: "view_entities",

  // System
  ACCESS_ADMIN_PANEL: "access_admin_panel",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_SETTINGS: "manage_settings",
};

// Define what permissions each role has
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    ...Object.values(PERMISSIONS), // All permissions
  ],

  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.EDIT_USER,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.EDIT_PROJECT,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_ENTITY,
    PERMISSIONS.EDIT_ENTITY,
    PERMISSIONS.DELETE_ENTITY,
    PERMISSIONS.VIEW_ENTITIES,
    PERMISSIONS.ACCESS_ADMIN_PANEL,
    PERMISSIONS.VIEW_ANALYTICS,
  ],

  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.EDIT_PROJECT,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_ENTITY,
    PERMISSIONS.EDIT_ENTITY,
    PERMISSIONS.VIEW_ENTITIES,
    PERMISSIONS.VIEW_ANALYTICS,
  ],

  [ROLES.EDITOR]: [
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_ENTITY,
    PERMISSIONS.EDIT_ENTITY,
    PERMISSIONS.VIEW_ENTITIES,
  ],
  [ROLES.ARTIST]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.VIEW_ENTITIES,
  ],

  [ROLES.USER]: [PERMISSIONS.VIEW_CONTENT, PERMISSIONS.VIEW_ENTITIES],
};

// Get current user role from localStorage
export const getCurrentUserRole = () => {
  try {
    const roleStr = localStorage.getItem("role");
    if (roleStr) {
      const roleData = JSON.parse(roleStr);
      return typeof roleData === "object" ? roleData.name : roleData;
    }
    return null;
  } catch (error) {
    console.warn("Failed to get user role:", error);
    return null;
  }
};

// Get current user's permissions
export const getCurrentUserPermissions = () => {
  const userRole = getCurrentUserRole();
  if (!userRole) return [];

  return ROLE_PERMISSIONS[userRole] || [];
};

// Check if user has a specific permission
export const hasPermission = (permission) => {
  const userPermissions = getCurrentUserPermissions();
  return userPermissions.includes(permission);
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (permissions) => {
  const userPermissions = getCurrentUserPermissions();
  return permissions.some((permission) => userPermissions.includes(permission));
};

// Check if user has all specified permissions
export const hasAllPermissions = (permissions) => {
  const userPermissions = getCurrentUserPermissions();
  return permissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

// Check if user has a specific role
export const hasRole = (role) => {
  const userRole = getCurrentUserRole();
  return userRole === role;
};

// Check if user has any of the specified roles
export const hasAnyRole = (roles) => {
  const userRole = getCurrentUserRole();
  return roles.includes(userRole);
};
