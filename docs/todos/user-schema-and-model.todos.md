# User Schema and Model - TODO

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Date**: 2025-07-03
- **Assigned To**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-03

## Description
Defines the user data model for the ecommerce backend using Mongoose and NestJS. Includes all business/user/account fields, address subdocuments, enums, and validation. Strict type safety and full test coverage.

## Completed
- [x] Implement User schema and model with all required fields and validation
- [x] Implement Address subdocument with type, validation, and isDefault
- [x] Add password hashing logic
- [x] Enforce unique email constraint
- [x] Add enum validation for role, address type, and status
- [x] Add/extend Jest tests for all new/changed logic
- [x] Update and sync documentation (PRD, TODO, README)

## Tasks
### Backend
- [ ] None
### Frontend
- [ ] Not in scope

## Dependencies
- [ ] None

## Testing Requirements
### Unit Tests
- [x] User schema/model logic
- [x] Address subdocument logic
### Integration Tests
- [x] Password hashing and validation
### E2E Tests
- [ ] (Future)

## Documentation
- [x] Update API documentation
- [x] Update README
- [x] Add/Update JSDoc comments

## Review Checklist
- [x] Code reviewed
- [x] Tests written and passing
- [x] Documentation updated
- [x] Performance considered
- [x] Security considerations addressed

## Notes
- See referenced files for schema, enums, and types
