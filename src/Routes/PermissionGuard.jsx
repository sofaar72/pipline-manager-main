import React from "react";
import {
  hasPermission,
  hasAnyPermission,
  hasRole,
  hasAnyRole,
  hasAllPermissions,
} from "../hooks/permissions/permissions";

export const PermissionGuard = ({
  permission,
  permissions,
  role,
  roles,
  requireAll = false,
  children,
  fallback = null,
}) => {
  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  } else if (role) {
    hasAccess = hasRole(role);
  } else if (roles) {
    hasAccess = hasAnyRole(roles);
  }

  return hasAccess ? children : fallback;
};
