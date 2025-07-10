# Checkout Process (Cash-on-Delivery) - Product Requirements Document

## Overview
- **Status**: Completed
- **Priority**: P0
- **Target Release**: v1.0.0
- **Tech Lead**: @marjan
- **Created**: 2024-06-01
- **Last Updated**: 2025-07-08

## Problem Statement
The platform needs a secure, robust, and user-friendly checkout process supporting cash-on-delivery, with full backend and frontend integration, atomic order creation, and traceable requirements.

## Goals & Objectives
- [x] End-to-end checkout flow (frontend + backend)
- [x] Cash-on-delivery support
- [x] Atomic order creation and stock reduction
- [x] Notification integration
- [x] 100% lint/type/test clean
- [x] Full Jest/E2E coverage
- [x] Requirements traceability in docs

## Non-Goals
- Online payment gateway integration
- Guest checkout (registered users only)

## User Stories
### As a user, I want to checkout my cart with cash-on-delivery so I can place an order securely
- [x] US-1: Checkout with cash-on-delivery
  - **Acceptance Criteria**:
    - [x] Address and order summary shown
    - [x] Order created with valid cart
    - [x] Stock reduced atomically
    - [x] Notification sent
    - [x] Confirmation UI/UX

### As an admin, I want to view and manage cash-on-delivery orders
- [x] US-2: Admin order management
  - **Acceptance Criteria**:
    - [x] Orders retrievable via API
    - [x] Status updatable (pending, confirmed, delivered)
    - [x] Notification sent

## Technical Requirements
### Backend
- [x] API endpoint for order creation (cash-on-delivery)
- [x] Order schema with paymentType: 'COD'
- [x] Atomic stock reduction
- [x] NotificationService integration
- [x] Jest/E2E test coverage
- [x] Postman/API doc sync

### Frontend
- [x] Checkout page and form
- [x] AddressForm, OrderSummary, CheckoutForm components
- [x] Cart integration
- [x] Notification/confirmation UI
- [x] Jest/RTL test coverage

## Test Plan
### Unit Tests
- [x] Backend: order service, controller, DTOs
- [x] Frontend: CheckoutForm, AddressForm, OrderSummary
### Integration/E2E Tests
- [x] Backend: order creation, stock, notification, RBAC
- [x] Frontend: end-to-end checkout flow

## Traceability
- All requirements, code, and tests are referenced in this PRD and related TODOs.
- See also: /docs/todos/checkout-process.todos.md, /backend/src/features/orders/*, /frontend/src/features/checkout/*, /frontend/src/features/cart/*

## Documentation
- [x] PRD and TODOs updated
- [x] API documentation updated
- [x] README updated
