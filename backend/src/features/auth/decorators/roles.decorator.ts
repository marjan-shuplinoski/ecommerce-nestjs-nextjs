import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/schemas/user.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

// Convenience decorators for common role combinations
export const AdminOnly = () => Roles(UserRole.ADMIN);
export const CustomerOnly = () => Roles(UserRole.CUSTOMER);
export const SellerOnly = () => Roles(UserRole.SELLER);
export const AdminOrSeller = () => Roles(UserRole.ADMIN, UserRole.SELLER);
export const AllRoles = () => Roles(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER);
