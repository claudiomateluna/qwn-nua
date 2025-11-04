import { User } from '@/types';

export const getUserRolePriority = (role: string): number => {
  const roleHierarchy: Record<string, number> = {
    'admin': 5,
    'dirigente': 4,
    'directiva': 3,  // presidente, tesorera, secretario, representante
    'apoderado': 2,
    'nnj': 1,        // lobato (a), guia, scout, pionera (o), caminante
  };

  // Directiva roles
  if (['presidente', 'tesorera', 'secretario', 'representante'].includes(role)) {
    return roleHierarchy['directiva'];
  }
  
  // NNJ roles
  if (['lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante'].includes(role)) {
    return roleHierarchy['nnj'];
  }
  
  // Other roles
  return roleHierarchy[role] || 0;
};

export const canAccessResource = (user: User, resourceOwnerId?: string, requiredRole?: string): boolean => {
  if (!user) return false;
  
  // Admin can access everything
  if (user.role === 'admin') return true;
  
  // Check if user has required role
  if (requiredRole && getUserRolePriority(user.role) < getUserRolePriority(requiredRole)) {
    return false;
  }
  
  // For personal resources (like profile, progress)
  if (resourceOwnerId && user.id === resourceOwnerId) {
    return true;
  }
  
  // For guardian access to associated NNJ resources
  if (['apoderado', 'dirigente'].includes(user.role) && resourceOwnerId) {
    // Here we would check if this user is guardian of resource owner
    // This would require additional database lookup
    // For now, we'll implement a simplified version
    return true;
  }
  
  // Default to false if no other condition is met
  return false;
};

export const hasRole = (user: User, roles: string[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

export const canManageUsers = (user: User): boolean => {
  return ['admin', 'dirigente', 'directiva'].includes(user.role);
};

export const canManageContent = (user: User): boolean => {
  return ['admin', 'dirigente', 'directiva'].includes(user.role);
};

export const canViewFinancials = (user: User): boolean => {
  return ['admin', 'dirigente', 'directiva', 'tesorera'].includes(user.role);
};