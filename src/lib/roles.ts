import { Session } from "next-auth";

export const ROLES = {
  CUSTOMER: "customer",
  STAFF: "staff",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

/**
 * Check if user has a specific role
 */
export function hasRole(session: Session | null, role: UserRole): boolean {
  if (!session?.user?.roles) return false;
  return session.user.roles.includes(role);
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(session: Session | null, roles: UserRole[]): boolean {
  if (!session?.user?.roles) return false;
  return roles.some(role => session.user.roles?.includes(role));
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(session: Session | null, roles: UserRole[]): boolean {
  if (!session?.user?.roles) return false;
  return roles.every(role => session.user.roles?.includes(role));
}

/**
 * Get user's primary role (first role in the list)
 */
export function getPrimaryRole(session: Session | null): UserRole | null {
  if (!session?.user?.roles || session.user.roles.length === 0) return null;
  return session.user.roles[0] as UserRole;
}

/**
 * Check if user is staff
 */
export function isStaff(session: Session | null): boolean {
  return hasRole(session, ROLES.STAFF);
}

/**
 * Check if user is customer
 */
export function isCustomer(session: Session | null): boolean {
  return hasRole(session, ROLES.CUSTOMER);
}
