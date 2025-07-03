# Category Schema and Model - Product Requirements Document

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-03

## Problem Statement
The backend requires a robust, hierarchical Category schema/model with strict typing, feature-sliced architecture, and full test coverage to support product categorization and navigation.

## Goals & Objectives
- [x] Implement category schema/model with all required fields
- [x] Add hierarchical support (parentCategory, tree)
- [x] Add slug auto-generation and unique validation
- [x] Add productCount, status, isDeleted
- [x] Add indexes for name, slug, parentCategory
- [x] Add soft delete method
- [x] Add static category tree method
- [x] Add/extend Jest tests for all logic
- [x] Update PRD, TODO, README

## Non-Goals
- Frontend category UI
- Product logic

## User Stories
### As a user, I want to browse products by category so that I can find relevant items easily
- [x] US-1: Category schema supports hierarchy and navigation
  - **Acceptance Criteria**:
    - [x] Hierarchical support (parentCategory, tree)
    - [x] Slug auto-generation and unique validation
    - [x] Product count tracking
    - [x] Soft delete and status fields
    - [x] Indexes and static methods present

## Technical Requirements
### Backend
- [x] Category schema/model in `backend/src/features/categories/schemas/category.schema.ts`
- [x] All required fields and logic
- [x] Full Jest test coverage

### Frontend
- Not in scope

## Test Plan
### Unit Tests
- [x] Category schema/model logic
### Integration Tests
- [x] Hierarchy/tree logic
### E2E Tests
- [ ] (Future)

## Dependencies
- None

## Open Questions
- [ ] Should categories support multi-language names?
- [ ] Should category tree be cached?

## Metrics & Success Criteria
- [x] All fields and logic implemented as described
- [x] All tests pass (integration/unit)
- [x] Lint/format clean

## Rollback Plan
- Step 1: Revert to previous category schema/model
- Step 2: Remove new fields and logic

## Additional Notes
- See user schema/model for standards
- See README.md for project structure

## Traceability
- All tasks and features mapped in category-schema-and-model.todos.md

## Task Status
- [x] Schema/model created
- [x] Hierarchy/tree logic
- [x] Slug generation/validation
- [x] Product count
- [x] Indexes
- [x] Soft delete
- [x] Tests (Jest)
- [x] Docs/PRD/TODO
