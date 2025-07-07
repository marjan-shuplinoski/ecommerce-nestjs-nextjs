# User Management - Product Requirements Document

## Overview
- **Status**: In Progress
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-07

## Problem Statement
The backend requires secure, extensible user management including registration, authentication, profile management, and RBAC, with strict validation and test coverage.

## Goals & Objectives
- [x] Implement user schema and model
- [ ] Create authentication service and JWT strategy
- [ ] Add RBAC guards and decorators
- [x] Profile management endpoints
- [x] Automated Jest tests for all logic
- [x] Documentation (PRD, TODO, README) synced

## Non-Goals
- Frontend user UI
- Social login integration

## User Stories
### As a user, I want to register, authenticate, and manage my profile so that I can securely use the platform
- [x] US-1: User registration and authentication
  - **Acceptance Criteria**:
    - [x] User schema/model implemented
    - [ ] Authentication service and JWT strategy
    - [ ] RBAC guards and decorators
    - [x] Profile management endpoints
    - [x] Automated Jest tests for all logic
    - [x] Documentation synced

### As a user, I want to manage my profile and addresses
- [x] US-2: User profile management
  - **Acceptance Criteria**:
    - [x] Get, update user profile
    - [x] Add, update, remove addresses
    - [x] Set default address
    - [x] Change password securely
    - [x] Upload profile avatar
    - [x] Comprehensive Jest tests

### As an admin, I want to manage user accounts
- [x] US-3: Admin user management
  - **Acceptance Criteria**:
    - [x] Search and filter users
    - [x] Update user status
    - [x] Activate/deactivate users
    - [x] Admin-only access controls
    - [x] Comprehensive Jest tests

## Technical Requirements
### Backend
- [x] User schema/model with addresses, roles, status
- [ ] Authentication service and JWT strategy
- [ ] RBAC guards and decorators
- [x] Profile management endpoints (CRUD, address management, avatar upload)
- [x] Admin user management endpoints (search, status management)
- [x] Full Jest test coverage (32 tests passing)
- [x] TypeScript strict compliance
- [x] ESLint compliance

### Frontend
- Not in scope

## Implementation Details
### User Profile Service Methods
- [x] `getUserProfile(userId)` - Get user profile data
- [x] `updateProfile(userId, updateDto)` - Update user profile
- [x] `addAddress(userId, addressDto)` - Add new address
- [x] `updateAddress(userId, index, updateDto)` - Update existing address
- [x] `removeAddress(userId, index)` - Remove address
- [x] `setDefaultAddress(userId, setDefaultDto)` - Set default address
- [x] `changePassword(userId, changePasswordDto)` - Secure password change
- [x] `searchUsers(searchDto)` - Admin search/filter users
- [x] `updateUserStatus(userId, statusDto)` - Admin update user status
- [x] `deactivateUser(userId)` - Admin deactivate user
- [x] `activateUser(userId)` - Admin activate user

### User Profile Controller Endpoints
- [x] `GET /users/me` - Get current user profile
- [x] `PUT /users/me` - Update current user profile
- [x] `POST /users/me/addresses` - Add new address
- [x] `PUT /users/me/addresses/:index` - Update address
- [x] `DELETE /users/me/addresses/:index` - Remove address
- [x] `PUT /users/me/addresses/default` - Set default address
- [x] `PUT /users/me/password` - Change password
- [x] `POST /users/me/avatar` - Upload profile avatar
- [x] `GET /users/admin/search` - Admin search users
- [x] `PUT /users/admin/:userId/status` - Admin update user status
- [x] `PUT /users/admin/:userId/deactivate` - Admin deactivate user
- [x] `PUT /users/admin/:userId/activate` - Admin activate user

## Test Plan
### Unit Tests
- [x] User schema/model logic (5 tests)
- [x] User profile service logic (17 tests)
- [x] User profile controller logic (10 tests)

### Integration Tests
- [ ] Authentication and RBAC (planned)

### E2E Tests
- [ ] (Future)

## Dependencies
- [x] FileUploadService for avatar uploads
- [x] NotificationService for standardized responses
- [x] bcryptjs for secure password hashing

## Open Questions
- [ ] Should user management support OAuth providers?
- [ ] Should RBAC be role or permission-based?

## Metrics & Success Criteria
- [x] User schema/model implemented
- [x] Profile management logic complete
- [x] Admin user management complete
- [x] 100% Jest test coverage (32/32 tests passing)
- [x] Lint/type error free
- [x] TypeScript strict compliance

## Rollback Plan
- Step 1: Revert to previous user management logic
- Step 2: Remove new endpoints and logic
- Step 3: Restore previous test suite

## Additional Notes
- All tasks and subtasks are reflected in the matching TODO file.
- Avatar uploads support image files up to 2MB
- Admin endpoints are marked for future RBAC integration
- Password changes require current password verification
- Address management supports default address selection

## Traceability
- All tasks and features mapped in user-management.todos.md

## Task Status
- [x] User schema/model implemented
- [ ] Authentication service and JWT strategy (next phase)
- [ ] RBAC guards and decorators (next phase)
- [x] Profile management endpoints
- [x] Admin user management endpoints
- [x] Automated Jest tests for all logic
- [x] Documentation synced
