# Cart Service - Product Requirements Document

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-03

## Problem Statement
Current ecommerce backend lacks robust, feature-sliced cart management with strict type safety, guest/user support, and full test coverage.

## Goals & Objectives
- [x] Feature-sliced architecture for cart logic
- [x] Strict DTO/type safety
- [x] Guest/user cart support
- [x] 100% lint/type/test clean
- [x] Full Jest coverage (unit/integration)
- [x] Complete RESTful API

## Non-Goals
- UI/UX frontend

## User Stories
### As a user, I want to manage my cart so that I can add, update, and remove products easily
- [x] US-1: Add item to cart
  - **Acceptance Criteria**:
    - [x] Item added/merged
    - [x] Total recalculated
- [x] US-2: Remove item from cart
  - **Acceptance Criteria**:
    - [x] Item removed
    - [x] Total recalculated

## Technical Requirements
### Backend
- [x] API endpoints for CRUD, add/remove/update, recalc
- [x] Mongoose schema for Cart/CartItem
- [x] Jest tests for all logic

### Frontend
- Not in scope

## Test Plan
### Unit Tests
- [x] Service logic (CRUD, add/remove/update, recalc)
- [x] Controller endpoints
### Integration Tests
- [x] In-memory MongoDB
### E2E Tests
- [ ] (Future)

## Traceability
- All tasks and features mapped in cart-service.todos.md

## Task Status
- [x] Schema/Types
- [x] Service logic
- [x] Lint/type fixes
- [x] Jest tests
- [x] Controller
- [x] API docs
- [x] Controller Jest tests
- [x] Documentation finalization
