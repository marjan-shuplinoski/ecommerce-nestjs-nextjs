# User Schema and Model PRD

## Feature: User Schema & Model

### Status
- In Progress

### Overview
Defines the user data model for the ecommerce backend using Mongoose and NestJS. Includes all business/user/account fields, address subdocuments, enums, and validation.

### Requirements
- All user fields as specified in the latest schema (see below)
- Address subdocument with type, validation, and isDefault
- Password hashing on save
- Unique email constraint
- Enum validation for role, address type, and status
- Automated Jest tests for all logic
- Documentation and TODOs kept in sync

### Fields
- firstName: String (required)
- lastName: String (required)
- email: String (required, unique, lowercase, trimmed)
- password: String (required, hashed)
- avatar: String (optional)
- role: String (enum: ['customer', 'admin', 'seller'], default: 'customer')
- addresses: Array of Address subdocuments (see below)
- phoneNumber: String (optional)
- dateOfBirth: Date (optional)
- isActive: Boolean (default: true)
- emailVerified: Boolean (default: false)
- createdAt: Date (auto)
- updatedAt: Date (auto)
- status: String (enum: ['active', 'inactive', 'suspended'], default: 'active')

#### Address Subdocument
- type: String (enum: ['shipping', 'billing'], required)
- street: String (required)
- city: String (required)
- state: String (required)
- zipCode: String (required)
- country: String (required)
- isDefault: Boolean (default: false)

### Acceptance Criteria
- All fields and validation present
- Passwords are hashed
- Email is unique
- Enums enforced
- Tests pass in CI
- Documentation and TODOs updated

### Traceability
- See matching TODO file for task status
