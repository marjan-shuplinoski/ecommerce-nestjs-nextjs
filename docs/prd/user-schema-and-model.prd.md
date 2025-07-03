# User Schema and Model - Product Requirements Document

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-03

## Problem Statement
The backend requires a secure, extensible user schema/model with strict validation, address subdocuments, and robust test coverage to support authentication, authorization, and user management.

## Goals & Objectives
- [x] Implement all user fields as specified in the latest schema
- [x] Add address subdocument with type, validation, and isDefault
- [x] Add password hashing on save
- [x] Enforce unique email constraint
- [x] Enum validation for role, address type, and status
- [x] Automated Jest tests for all logic
- [x] Documentation and TODOs kept in sync

## Non-Goals
- Frontend user UI
- Payment or order logic

## User Stories
### As a user, I want my account and addresses to be secure and validated so that I can safely use the platform
- [x] US-1: User schema supports all required fields and validation
  - **Acceptance Criteria**:
    - [x] All fields and validation present
    - [x] Passwords are hashed
    - [x] Email is unique
    - [x] Enums enforced
    - [x] Tests pass in CI

## Technical Requirements
### Backend
- [x] User schema/model in `backend/src/features/users/schemas/user.schema.ts`
- [x] Address subdocument
- [x] Password hashing logic
- [x] Enum validation
- [x] Full Jest test coverage

### Frontend
- Not in scope

## Test Plan
### Unit Tests
- [x] User schema/model logic
- [x] Address subdocument logic
### Integration Tests
- [x] Password hashing and validation
### E2E Tests
- [ ] (Future)

## Dependencies
- None

## Open Questions
- [ ] Should user schema support social login fields?
- [ ] Should address validation use external APIs?

## Metrics & Success Criteria
- [x] All fields and validation present
- [x] 100% Jest test coverage
- [x] Lint/type error free

## Rollback Plan
- Step 1: Revert to previous user schema/model
- Step 2: Remove new fields and logic

## Additional Notes
- See referenced files for schema, enums, and types

## Traceability
- All tasks and features mapped in user-schema-and-model.todos.md

## Task Status
- [x] User schema/model created
- [x] Address subdocument integrated
- [x] Password hashing logic
- [x] Unique email constraint
- [x] Enum validation
- [x] Jest tests
- [x] Documentation finalization
