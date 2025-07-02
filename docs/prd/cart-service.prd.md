# Cart Service – Product Requirements Document

## Status
Done

## Overview
Implements robust, feature-sliced Cart service logic for Ecommerce backend (NestJS/Mongoose). Supports guest/user carts, CRUD operations, and total calculation. Strict TypeScript, error handling, and test coverage required.

## Features
- Create cart (user/guest)
- Get cart by ID
- Add item to cart (merge or push)
- Remove item from cart
- Update item in cart
- Clear cart
- Recalculate total
- Strict type safety
- Full Jest test coverage
- RESTful API controller

## API Endpoints
| Method | Path                  | Description                | Body Params                |
|--------|-----------------------|----------------------------|----------------------------|
| POST   | /api/cart             | Create cart                | userId?, isGuest?          |
| GET    | /api/cart/:id         | Get cart by ID             | -                          |
| PATCH  | /api/cart/:id/add-item| Add item to cart           | productId, quantity, price |
| PATCH  | /api/cart/:id/update-item | Update item in cart    | productId, quantity, price |
| PATCH  | /api/cart/:id/remove-item | Remove item from cart  | productId                  |
| PATCH  | /api/cart/:id/clear   | Clear cart                 | -                          |
| PATCH  | /api/cart/:id/recalculate | Recalculate total      | -                          |

## Architecture
- Feature-sliced: service, schema, types, controller, tests grouped by cart feature
- Uses Mongoose subdocuments for items
- All business logic in service
- No direct DB access from controllers

## Traceability
- All methods and tests mapped to tasks in TODO file

## Task Status
- [x] Schema/Types
- [x] Service logic
- [x] Lint/type fixes
- [x] Jest tests
- [x] Controller
- [x] API docs
- [x] Controller Jest tests
- [x] Documentation finalization

---
