# Cart Service - Product Requirements Document

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-10

## Problem Statement
Current ecommerce backend lacked robust, feature-sliced cart management with strict type safety, guest/user support, and full test coverage. Now fully implemented with RBAC/JWT protection, notification integration, and a complete frontend UI/UX.

## Goals & Objectives
- [x] Feature-sliced architecture for cart logic
- [x] Strict DTO/type safety
- [x] Guest/user cart support
- [x] 100% lint/type/test clean
- [x] Full Jest coverage (unit/integration/E2E)
- [x] Complete RESTful API
- [x] RBAC/JWT protection for all endpoints
- [x] Notification integration for all cart actions
- [x] Frontend: CartPage, CartItem, CartSidebar, CartSummary, QuantitySelector, EmptyCart, useCart hook, notification integration

## Non-Goals
- Payment processing
- Order history

## User Stories
### As a user, I want to manage my cart so that I can add, update, and remove products easily
- [x] US-1: Add item to cart
  - **Acceptance Criteria**:
    - [x] Item added/merged
    - [x] Total recalculated
    - [x] Notification shown
- [x] US-2: Remove item from cart
  - **Acceptance Criteria**:
    - [x] Item removed
    - [x] Total recalculated
    - [x] Notification shown
- [x] US-3: Cart is protected and isolated per user (JWT)
- [x] US-4: Notification is sent for all cart actions
- [x] US-5: Cart persists for guests (localStorage)

## Technical Requirements
### Backend
- [x] API endpoints for CRUD, add/remove/update, recalc
- [x] Mongoose schema for Cart/CartItem
- [x] Jest tests for all logic
- [x] RBAC/JWT protection for all endpoints
- [x] Notification integration

### Frontend
- [x] CartPage, CartItem, CartSidebar, CartSummary, QuantitySelector, EmptyCart components
- [x] useCart hook for state management
- [x] Notification integration
- [x] Jest tests for all components and hooks

## Test Plan
### Unit Tests
- [x] Service logic (CRUD, add/remove/update, recalc)
- [x] Controller endpoints
- [x] CartPage renders items and sidebar
- [x] CartItem handles quantity and removal
- [x] useCart manages state and persistence
### Integration Tests
- [x] In-memory MongoDB
- [x] Cart operations update UI and storage
### E2E Tests
- [x] All endpoints covered

## Traceability
- All tasks and features mapped in cart-service.todos.md
- RBAC/JWT/notification integration verified

## Task Status
- [x] Schema/Types
- [x] Service logic
- [x] Lint/type fixes
- [x] Controller/routes
- [x] Notification integration
- [x] RBAC/JWT protection
- [x] All tests passing
- [x] Documentation updated
