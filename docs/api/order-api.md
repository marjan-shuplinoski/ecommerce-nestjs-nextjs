# Order API Documentation

## Overview
RESTful API for order management. All endpoints require JWT authentication. Admin endpoints require `admin` role. All responses include a `notification` object for user feedback.

## Endpoints

### Create Order (User)
- **POST** `/orders`
- **Auth:** Bearer JWT (user)
- **Body:** `{ cartId: string, address: string }`
- **Response:** `{ data: Order, notification: Notification }`

### Get User Orders
- **GET** `/orders`
- **Auth:** Bearer JWT (user)
- **Response:** `{ data: Order[], notification: Notification }`

### Get Order by ID
- **GET** `/orders/:id`
- **Auth:** Bearer JWT (user)
- **Response:** `{ data: Order, notification: Notification }`

### Update Order Status (Admin)
- **PATCH** `/orders/:id/status`
- **Auth:** Bearer JWT (admin)
- **Body:** `{ status: string }`
- **Response:** `{ data: Order, notification: Notification }`

### Confirm Payment (Admin)
- **PATCH** `/orders/:id/confirm-payment`
- **Auth:** Bearer JWT (admin)
- **Body:** `{ paymentStatus: string }`
- **Response:** `{ data: Order, notification: Notification }`

### Delete Order (Admin)
- **DELETE** `/orders/:id`
- **Auth:** Bearer JWT (admin)
- **Response:** `{ notification: Notification }`

### RBAC & Notification
- All endpoints enforce RBAC (user/admin) via JWT.
- All responses include a `notification` object: `{ type: 'success' | 'error', message: string, code?: string }`.

### Error Handling
- 401: Unauthorized (missing/invalid JWT)
- 403: Forbidden (RBAC violation)
- 404: Not found
- 400: Validation error

### Example Notification
```json
{
  "notification": {
    "type": "success",
    "message": "Order created successfully."
  }
}
```

### See Also
- [Order PRD](../prd/order-service.prd.md)
- [Order TODO](../todos/order-service.todos.md)
- [Postman Collection](../../backend/postman/ecommerce-api.postman_collection.json)
