# JWT Authentication Service and Strategy PRD

## Status
In Progress

## Overview
Implement robust JWT authentication in NestJS with access/refresh tokens, Passport JWT strategy, token validation, and notification integration. Includes comprehensive authentication DTOs for all auth flows (register, login, password reset). Strict typing, feature-sliced architecture, and project/global standards required. Full unit/integration test coverage. CI-ready.

## Features
- JWT service (access/refresh tokens)
- Passport JWT strategies (access, refresh)
- JWT guards
- Authentication DTOs (register, login, forgot password, reset password)
- Custom validation decorators (password matching)
- Notification integration for all auth events
- Feature-sliced, strict TypeScript
- Jest unit/integration tests
- Documentation and CI-ready

## Task Status
- [x] Analyze requirements, dependencies, and architecture
- [x] Implement JWT service (core logic)
- [x] Implement Passport JWT strategies
- [x] Implement JWT guards
- [x] Wire up AuthModule and index.ts
- [x] Add Jest unit tests for all logic
- [x] Create Auth DTOs and Validation (register, login, forgot password, reset password)
- [x] Add custom password match validator
- [x] Add comprehensive DTO tests
- [ ] Add integration tests (if needed)
- [ ] Update README and documentation
- [ ] Final CI validation

## Authentication DTOs
- **RegisterDto**: Name, email, password, confirmPassword with comprehensive validation
- **LoginDto**: Email and password validation for authentication
- **ForgotPasswordDto**: Email validation for password reset requests
- **ResetPasswordDto**: Token, new password, and confirm password validation
- **Custom Validators**: Password match validation decorator

## Traceability
- User model and Notification system dependencies complete
- All code and tests in `backend/src/features/auth/`
- DTOs follow existing project patterns and validation standards

## Acceptance Criteria
- JWT service and strategy implemented
- Token validation present
- Authentication DTOs implemented with validation
- Custom password match validator working
- Notifications integrated
- Automated Jest tests and documentation are present and up to date

## Notes
- Follows all project and global standards
- Uses pnpm, strict TypeScript, feature-sliced structure
- All code linted and CI-ready
- DTOs use class-validator and class-transformer
- Password validation includes complexity requirements
