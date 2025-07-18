# Order Service - Product Requirements Document

## Overview
- **Status**: Done
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-08

## Problem Statement
Current ecommerce backend lacks robust, feature-sliced order management with strict type safety, atomic stock handling, and full test coverage.

## Goals & Objectives
- [x] Feature-sliced architecture for order logic
- [x] Strict DTO/type safety
- [x] Notification integration
- [x] 100% lint/type/test clean
- [x] Full Jest coverage (unit/integration)
- [x] Complete RESTful API

## Non-Goals
- Payment gateway integration (manual only)
- UI/UX frontend

## User Stories
### As a user, I want to place an order from my cart so that I can purchase products securely
- [x] US-1: Place order from cart
  - **Acceptance Criteria**:
    - [x] Order created with valid cart
    - [x] Stock reduced atomically
    - [x] Notification sent

### As an admin, I want to confirm payment and update order status
- [x] US-2: Confirm payment (admin)
  - **Acceptance Criteria**:
    - [x] Payment status updated
    - [x] Notification sent

## Technical Requirements
### Backend
- [x] API endpoints for CRUD, status, payment
- [x] Mongoose schema for Order/OrderItem
- [x] NotificationService integration
- [x] Atomic stock reduction
- [x] Jest tests for all logic
- [x] 100% lint/type/test clean
- [x] Full Jest coverage (unit/integration)
- [x] Complete RESTful API
- [x] E2E test coverage (orders, RBAC, notifications)
- [x] Postman collection and API doc sync

### Frontend
- Not in scope

## Test Plan
### Unit Tests
- [x] Service logic (create, status, payment, cancel, get)
- [x] Controller endpoints
### Integration Tests
- [x] In-memory MongoDB
### E2E Tests
- [x] Orders, RBAC, notification, error/edge cases (see test/order.e2e-spec.ts)

## Traceability
- All tasks and features mapped in order-service.todos.md

## Task Status
- [x] Schema/Types
- [x] DTOs
- [x] Service logic
- [x] Lint/type fixes
- [x] Jest tests
- [x] Controller
- [x] API docs
- [x] Controller Jest tests
- [x] Documentation finalization
- [x] E2E test coverage (orders, RBAC, notifications)
- [x] Postman/API doc sync
