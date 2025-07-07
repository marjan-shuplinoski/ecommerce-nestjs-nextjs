import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/schemas/user.schema';
import {
  Roles,
  AdminOnly,
  CustomerOnly,
  SellerOnly,
  AdminOrSeller,
  AllRoles,
  ROLES_KEY,
} from '../decorators/roles.decorator';

describe('Roles Decorator', () => {
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
  });

  describe('Roles decorator', () => {
    it('should set metadata for single role', () => {
      @Roles(UserRole.ADMIN)
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.ADMIN]);
    });

    it('should set metadata for multiple roles', () => {
      @Roles(UserRole.ADMIN, UserRole.SELLER)
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.ADMIN, UserRole.SELLER]);
    });
  });

  describe('AdminOnly decorator', () => {
    it('should set admin role metadata', () => {
      @AdminOnly()
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.ADMIN]);
    });
  });

  describe('CustomerOnly decorator', () => {
    it('should set customer role metadata', () => {
      @CustomerOnly()
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.CUSTOMER]);
    });
  });

  describe('SellerOnly decorator', () => {
    it('should set seller role metadata', () => {
      @SellerOnly()
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.SELLER]);
    });
  });

  describe('AdminOrSeller decorator', () => {
    it('should set admin and seller roles metadata', () => {
      @AdminOrSeller()
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.ADMIN, UserRole.SELLER]);
    });
  });

  describe('AllRoles decorator', () => {
    it('should set all roles metadata', () => {
      @AllRoles()
      class TestClass {}

      const roles = reflector.get<UserRole[]>(ROLES_KEY, TestClass);
      expect(roles).toEqual([UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER]);
    });
  });
});
