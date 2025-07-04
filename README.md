# Ecommerce-Nestjs-Nextjs - E-commerce Platform

A modern, scalable e-commerce platform planned to use NestJS (backend) and Next.js (frontend) with feature-sliced architecture, strict TypeScript, pnpm-only dependency management, and best practices for code quality, documentation, and workflow.

> **⚠️ CURRENT STATUS: PROJECT PLANNING PHASE**  
> This project is currently in the planning and documentation phase.
> All features described are planned implementations that need to be built from scratch.

## 📚 Project Documentation

This project follows a documentation-driven approach. All development standards, workflows, and guides are located in the `docs/` directory.

- **[Testing Guide](./docs/testing_guide.md)**: Contains all guidelines for writing unit, integration, and E2E tests.
- **[PRDs (`docs/prd/`)](./docs/prd/)**: Contains all Product Requirements Documents for each feature.
- **[TODOs (`docs/todos/`)](./docs/todos/)**: Contains task breakdowns for each PRD.

## 📋 Project Status

**Current Implementation Status:** Project Planning and Setup Phase  
**Task Management:** Advanced task management system ready for implementation  
**Progress:** Project structure and documentation defined, implementation to begin

### Development Progress
- ✅ **Project Documentation**: Comprehensive README with architecture and standards
- ✅ **Development Guidelines**: Complete project guidelines and contribution rules  
- ✅ **Task Management Setup**: MCP Shrimp Task Manager configuration ready
- ✅ **VS Code Configuration**: Development environment setup with MCP servers
- 🚧 **Backend Implementation**: NestJS backend with all features to be implemented
- 🚧 **Frontend Implementation**: Next.js frontend to be implemented
- 🚧 **Database Setup**: MongoDB with Mongoose setup planned
- 🚧 **Authentication System**: JWT strategy, guards, RBAC to be implemented
- 🚧 **API Development**: All backend routes and controllers to be created
- 🚧 **Testing Framework**: E2E and unit tests to be implemented
- 🚧 **Security Implementation**: CORS, Helmet, validation pipes to be added
- 🚧 **Frontend Development**: NextJS components and pages to be built

### Recently Planned Features

#### Backend Infrastructure (🚧 To Be Implemented)
- **Project Foundation**: Feature-sliced architecture, pnpm-only dependency management
- **Database Layer**: MongoDB with Mongoose, connection pooling, health checks
- **Configuration**: Environment validation with Joi, type-safe configuration module
- **Security Framework**: CORS, Helmet, rate limiting, validation pipes, exception filters

#### Authentication & Authorization (🚧 To Be Implemented)
- **JWT Implementation**: Complete strategy with Passport.js integration
- **RBAC System**: Role-based access control with decorators and guards
- **Auth Endpoints**: Register, login, logout, refresh, password reset functionality
- **Security Features**: Password hashing, token validation, protected routes

#### Shopping Cart Backend (🚧 To Be Implemented)
- **Cart Schema**: MongoDB schema with user-based cart persistence
- **Cart Service**: Full CRUD operations (add, update, remove, clear items)
- **Cart Controller**: Protected REST endpoints with JWT authentication
- **DTOs & Validation**: Input validation with class-validator
- **E2E Testing**: Complete test suite to be implemented
- **Error Handling**: Proper error responses and edge case handling

#### Products Management (🚧 To Be Implemented)
- **Product CRUD**: Complete product lifecycle management with validation
- **Advanced Features**: Bulk operations, image management, SEO optimization
- **Search & Filter**: Product filtering by category, price, status, and tags
- **Product Schema**: Rich schema with attributes, dimensions, reviews, ratings
- **Reviews System**: Product review management with moderation capabilities

#### User Management (🚧 To Be Implemented)
- **User Profiles**: Complete profile management with address handling
- **Role System**: Customer, Admin, Vendor roles with appropriate permissions
- **User Services**: Profile updates, address management, search functionality
- **File Upload**: Secure profile image upload with validation

#### Categories System (🚧 To Be Implemented)
- **Hierarchical Categories**: Parent-child category relationships
- **Category CRUD**: Full lifecycle management with slug generation
- **Product Association**: Category-product relationships with indexing

#### Technical Goals
- **Zero Linting Errors**: All code to pass ESLint with strict TypeScript configuration
- **Complete Type Safety**: No `any` types, strict typing throughout the codebase
- **Test Coverage**: Comprehensive e2e and unit tests with proper isolation
- **Security Implementation**: JWT authentication, RBAC, input validation, rate limiting
- **Feature Slicing**: Clean separation of concerns by feature modules
- **Database Optimization**: Proper indexing, connection pooling, and query optimization
- **Error Handling**: Global exception filters, validation pipes, and user-friendly responses
- **Code Quality**: Automated linting, formatting, and consistent architecture patterns
- **Documentation**: Comprehensive README, project rules, and development guidelines
- **Task Management**: Advanced task tracking system for systematic implementation

## 🚀 Features

### Core Functionality
- 🛍️ Product catalog with categories and search
- 🛒 Shopping cart and wishlist
- 💳 Payment on delivery (admin marks as paid after delivery, no online payment)
- 📦 Order management and tracking
- 👤 User account management
- 📱 Responsive mobile-first design
- ⭐ Product reviews and ratings

### Advanced Features
- 🎯 Advanced product filtering and sorting
- 📊 Sales analytics and reporting
- 🚚 Shipping calculation and tracking
- 💰 Discount codes and promotions
- 📈 Inventory management
- 🌍 Multi-language support
- 💱 Multi-currency support

### Admin Features
- 📊 Comprehensive admin dashboard
- 📦 Product management (CRUD)
- 👥 User management
- 📋 Order management (manual payment confirmation after delivery)
- 📈 Sales reports and analytics
- 🏷️ Category and brand management
- 🎫 Coupon management

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework for SSR/SSG
- **React 18** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - Component library (optional, can be combined with Tailwind)
- **React Hook Form** - Form handling
- **React Query** - Server state management

### Backend
- **NestJS 10** - Progressive Node.js framework (feature-sliced, strict TypeScript)
- **Node.js 18+** - Runtime environment
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image management

## 📁 Project Structure (Planned)

```
Ecommerce-Nestjs-Nextjs/
├── backend/                    # NestJS (feature-sliced) - TO BE CREATED
│   ├── src/
│   │   ├── features/           # Feature modules (auth, cart, products, users, categories)
│   │   │   ├── auth/           # 🚧 JWT authentication system to implement
│   │   │   │   ├── controllers/ # Auth controller with register/login/logout
│   │   │   │   ├── services/   # JWT service, Auth service, RBAC service
│   │   │   │   ├── strategies/ # JWT strategy with Passport integration
│   │   │   │   ├── guards/     # JWT auth guard, roles guard
│   │   │   │   ├── dto/        # Login, register, reset-password DTOs
│   │   │   │   ├── decorators/ # Roles decorator for RBAC
│   │   │   │   ├── enums/      # Permissions enumeration
│   │   │   │   └── types/      # JWT payload types
│   │   │   ├── cart/           # 🚧 Shopping cart implementation to create
│   │   │   │   ├── controllers/ # Cart controller with protected endpoints
│   │   │   │   ├── services/   # Cart service with CRUD operations
│   │   │   │   ├── schemas/    # MongoDB cart schema with validation
│   │   │   │   ├── dto/        # Add/update cart DTOs with validation
│   │   │   │   └── __tests__/  # E2E tests to implement
│   │   │   ├── products/       # 🚧 Product management system to create
│   │   │   │   ├── controllers/ # Products controller with CRUD and bulk operations
│   │   │   │   ├── services/   # Products service with advanced filtering
│   │   │   │   ├── schemas/    # Product schema with attributes, reviews, SEO
│   │   │   │   ├── dto/        # Create/update/filter product DTOs
│   │   │   │   ├── enums/      # Product status enumeration
│   │   │   │   ├── types/      # Product type definitions
│   │   │   │   └── __tests__/  # Product schema and controller tests
│   │   │   ├── users/          # 🚧 User management system to create
│   │   │   │   ├── controllers/ # Users controller with profile management
│   │   │   │   ├── services/   # Users service, file upload service
│   │   │   │   ├── schemas/    # User schema with address subdocuments
│   │   │   │   ├── dto/        # Update profile, address DTOs
│   │   │   │   ├── enums/      # User role enumeration
│   │   │   │   └── types/      # User type definitions
│   │   │   ├── categories/     # 🚧 Category management system to create
│   │   │   │   ├── controllers/ # Category controller with CRUD operations
│   │   │   │   ├── services/   # Category service with hierarchical support
│   │   │   │   ├── schemas/    # Category schema with hierarchical support
│   │   │   │   ├── dto/        # Category DTOs
│   │   │   │   └── __tests__/  # Category schema validation tests
│   │   │   └── orders/         # 🚧 Order management system to create
│   │   │       ├── controllers/ # Order controller with lifecycle management
│   │   │       ├── services/   # Order service with status tracking
│   │   │       ├── schemas/    # Order schema with payment integration
│   │   │       ├── dto/        # Order DTOs
│   │   │       └── __tests__/  # Order system tests
│   │   ├── shared/             # Shared infrastructure and utilities - TO CREATE
│   │   │   ├── config/         # 🚧 Configuration module with Joi validation
│   │   │   ├── database/       # 🚧 MongoDB connection and configuration
│   │   │   ├── common/         # 🚧 Middleware, filters, pipes, validators
│   │   │   │   ├── cors.config.ts
│   │   │   │   ├── helmet.config.ts
│   │   │   │   ├── http-exception.filter.ts
│   │   │   │   ├── logger.middleware.ts
│   │   │   │   ├── rate-limit.config.ts
│   │   │   │   └── validation.pipe.ts
│   │   │   └── health/         # 🚧 Health monitoring endpoints
│   │   ├── main.ts             # 🚧 Application bootstrap with security
│   │   └── app.module.ts       # 🚧 Root module with feature imports
│   ├── test/                   # E2E test configuration - TO CREATE
│   ├── package.json            # 🚧 pnpm configuration with dependencies
│   ├── tsconfig.json           # 🚧 Strict TypeScript configuration
│   ├── eslint.config.mjs       # 🚧 ESLint configuration
│   └── nest-cli.json           # NestJS CLI configuration
│
├── frontend/                   # Next.js (feature-sliced) - TO BE CREATED
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── app/                # 🚧 Next.js App Router setup
│   │   │   ├── layout.tsx      # 🚧 Root layout with fonts
│   │   │   ├── page.tsx        # 🚧 Homepage implementation
│   │   │   ├── globals.css     # 🚧 Tailwind CSS with dark mode
│   │   │   ├── auth/           # 🚧 Authentication pages
│   │   │   ├── products/       # 🚧 Product catalog pages
│   │   │   ├── cart/           # 🚧 Shopping cart page
│   │   │   ├── orders/         # 🚧 Order management pages
│   │   │   └── admin/          # 🚧 Admin dashboard pages
│   │   ├── features/           # 🚧 Feature modules (products, cart, orders, etc.)
│   │   │   ├── auth/           # Authentication components and logic
│   │   │   ├── products/       # Product catalog components
│   │   │   ├── cart/           # Shopping cart components
│   │   │   ├── orders/         # Order management components
│   │   │   └── admin/          # Admin dashboard components
│   │   └── shared/             # 🚧 Shared UI/components/hooks/types
│   │       ├── components/     # Reusable UI components
│   │       ├── hooks/          # Custom React hooks
│   │       ├── types/          # TypeScript type definitions
│   │       ├── utils/          # Utility functions
│   │       └── api/            # API client and services
│   ├── package.json            # 🚧 Next.js dependencies
│   ├── next.config.ts          # 🚧 Next.js configuration
│   ├── tailwind.config.ts      # 🚧 Tailwind CSS setup
│   ├── tsconfig.json           # 🚧 TypeScript configuration
│   └── eslint.config.mjs       # 🚧 ESLint configuration
│
├── .github/                    # Project governance and CI/CD
│   └── instructions/           # ✅ Comprehensive project guidelines
│       └── project.instructions.md
├── .vscode/                    # Development tools configuration
│   └── mcp.json               # ✅ Model Context Protocol servers
├── docs/                       # 🚧 Project documentation to be created
│   ├── prd/                    # Product requirement documents
│   ├── todos/                  # Task tracking files
│   └── api/                    # API documentation
├── .gitignore                 # 🚧 Git ignore patterns to create
├── docker-compose.yml         # 🚧 Docker configuration to create
└── README.md                  # ✅ This comprehensive documentation
```

## 🗄️ Database Schema

### User Model (📋 Planned Schema)
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required),
  avatar: String,
  role: String (enum: ['customer', 'admin', 'seller']),
  addresses: [{
    type: String (enum: ['shipping', 'billing']),
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: Boolean
  }],
  phoneNumber: String,
  dateOfBirth: Date,
  isActive: Boolean,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  status: String (enum: ['active', 'inactive', 'suspended']),
}
```

### Product Model (📋 Planned Schema)
```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String (required),
  shortDescription: String,
  price: Number (required),
  salePrice: Number,
  sku: String (required, unique),
  brand: String,
  category: ObjectId (ref: 'Category', required),
  images: [String],
  stock: Number (required),
  status: String (enum: ['active', 'inactive', 'out-of-stock']),
  attributes: [{
    name: String,
    value: String
  }],
  specifications: Map,
  tags: [String],
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  reviews: [{
    user: ObjectId (ref: 'User'),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  averageRating: Number,
  totalReviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model (📋 Planned Schema)
```javascript
{
  user: ObjectId (ref: 'User', required),
  orderNumber: String (required, unique),
  items: [{
    product: ObjectId (ref: 'Product'),
    name: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phoneNumber: String
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  subtotal: Number,
  tax: Number,
  shipping: Number,
  discount: Number,
  total: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: String (default: 'cash_on_delivery'),
  paymentConfirmationId: String, // Admin confirmation reference
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Model (📋 Planned Schema)
```javascript
{
  userId: String (required),
  items: [{
    productId: ObjectId (required),
    quantity: Number (required, min: 1),
    price: Number (default: 0)
  }],
  total: Number (default: 0),
  isGuest: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model (📋 Planned Schema)
```javascript
{
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  image: String,
  parentCategory: ObjectId (ref: 'Category'),
  isActive: Boolean,
  sortOrder: Number,
  productCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- Cloudinary Account (for images)
- pnpm 8+ (required, enforced)

### Installation

1. **Clone and navigate**
   ```bash
   git clone https://github.com/marjan-shuplinoski/ecommerce-nestjs-nextjs.git
   cd Ecommerce-Nestjs-Nextjs
   ```

2. **Backend Setup (To Be Created)**
   ```bash
   # Backend will be created with NestJS CLI
   # Create backend folder structure
   # Install dependencies with pnpm
   # Setup TypeScript, ESLint, Prettier
   ```

3. **Frontend Setup (To Be Created)**
   ```bash
   # Frontend will be created with Next.js
   # Create frontend folder structure
   # Install dependencies with pnpm
   # Setup Tailwind CSS, TypeScript
   ```

4. **Environment Setup (To Be Created)**
   
   Backend `.env` (example):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:3000
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   
   Frontend `.env` (example):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_APP_NAME=Ecommerce-Nestjs-Nextjs
   NEXT_PUBLIC_CURRENCY=USD
   ```

5. **Development (After Implementation)**
   ```bash
   # Start backend development server
   cd backend && pnpm run start:dev
   
   # Start frontend development server
   cd frontend && pnpm dev
   ```

## 📱 API Endpoints (Planned Implementation)

> **Note:** All backend routes will be root-based (e.g., `/auth/login`, `/products`, `/orders`). The `/api/v1` prefix will be used.

### Authentication (🚧 To Be Implemented)
- `POST /auth/register` - Register user with role assignment
  - **Purpose**: Create new user account with email validation
  - **Access**: Public
  - **Body**: { firstName, lastName, email, password, role? }
  - **Response**: { user, tokens }
  - **Postman Collection**: Auth endpoints testing

- `POST /auth/login` - Login user with JWT tokens
  - **Purpose**: Authenticate user and return access/refresh tokens
  - **Access**: Public
  - **Body**: { email, password }
  - **Response**: { user, tokens }

- `POST /auth/logout` - Logout user and clear tokens
  - **Purpose**: Invalidate user session and clear refresh tokens
  - **Access**: Authenticated
  - **Response**: { message }

- `POST /auth/refresh` - Refresh JWT access token
  - **Purpose**: Generate new access token using refresh token
  - **Access**: Refresh token required
  - **Response**: { accessToken }

- `POST /auth/reset-password` - Reset user password
  - **Purpose**: Password reset functionality with email verification
  - **Access**: Public
  - **Body**: { email } or { token, newPassword }

### Users (🚧 To Be Implemented)
- `GET /users/me` - Get current user profile
  - **Purpose**: Retrieve authenticated user's profile information
  - **Access**: Authenticated
  - **Response**: { user profile with addresses }

- `PUT /users/me` - Update user profile
  - **Purpose**: Update user profile information (name, phone, avatar)
  - **Access**: Authenticated
  - **Body**: { firstName?, lastName?, phoneNumber?, avatar? }

- `PUT /users/me/address` - Update user address
  - **Purpose**: Add or update shipping/billing addresses
  - **Access**: Authenticated
  - **Body**: { address object with type }

- `GET /users/search` - Search users (Admin only)
  - **Purpose**: Admin functionality to search and manage users
  - **Access**: Admin role required
  - **Query**: ?q=search&role=filter&status=filter

### Products (🚧 To Be Implemented)
- `GET /products` - Get all products with advanced filtering
  - **Purpose**: Retrieve product catalog with search, filter, and pagination
  - **Access**: Public
  - **Query**: ?category=id&price=min-max&search=term&page=1&limit=20
  - **Response**: { products[], total, pagination }

- `GET /products/:id` - Get single product details
  - **Purpose**: Retrieve detailed product information including reviews
  - **Access**: Public
  - **Response**: { product with full details, reviews, related products }

- `POST /products` - Create product (Admin only)
  - **Purpose**: Add new product to catalog
  - **Access**: Admin role required
  - **Body**: { complete product object }
  - **Response**: { created product }

- `PUT /products/:id` - Update product (Admin only)
  - **Purpose**: Update existing product information
  - **Access**: Admin role required
  - **Body**: { product fields to update }

- `DELETE /products/:id` - Delete product (Admin only)
  - **Purpose**: Remove product from catalog (soft delete)
  - **Access**: Admin role required

- `POST /products/bulk` - Bulk create products (Admin only)
  - **Purpose**: Import multiple products at once
  - **Access**: Admin role required
  - **Body**: { products: [] }

- `PATCH /products/bulk` - Bulk update products (Admin only)
  - **Purpose**: Update multiple products simultaneously
  - **Access**: Admin role required

- `DELETE /products/bulk` - Bulk delete products (Admin only)
  - **Purpose**: Delete multiple products at once
  - **Access**: Admin role required

- `PATCH /products/:id/image` - Add product image (Admin only)
  - **Purpose**: Upload and add product images
  - **Access**: Admin role required
  - **Body**: FormData with image files

- `DELETE /products/:id/image` - Remove product image (Admin only)
  - **Purpose**: Remove specific product image
  - **Access**: Admin role required

- `PATCH /products/:id/seo` - Update product SEO (Admin only)
  - **Purpose**: Update product SEO metadata
  - **Access**: Admin role required
  - **Body**: { metaTitle, metaDescription, keywords }

### Cart (🚧 To Be Implemented)
- `GET /cart` - Get user cart
  - **Purpose**: Retrieve current user's shopping cart with items
  - **Access**: Authenticated
  - **Response**: { cart with populated product details, total }

- `POST /cart/add` - Add item to cart
  - **Purpose**: Add product to shopping cart or update quantity
  - **Access**: Authenticated
  - **Body**: { productId, quantity }
  - **Response**: { updated cart }

- `PUT /cart/item` - Update cart item quantity
  - **Purpose**: Modify quantity of existing cart item
  - **Access**: Authenticated
  - **Body**: { productId, quantity }

- `DELETE /cart/item/:productId` - Remove item from cart
  - **Purpose**: Remove specific product from cart
  - **Access**: Authenticated
  - **Response**: { updated cart }

- `DELETE /cart` - Clear entire cart
  - **Purpose**: Remove all items from cart
  - **Access**: Authenticated
  - **Response**: { empty cart }

### Categories (🚧 To Be Implemented)
- `GET /categories` - Get all categories
  - **Purpose**: Retrieve category hierarchy for navigation
  - **Access**: Public
  - **Response**: { categories with parent-child relationships }

- `POST /categories` - Create category (Admin)
  - **Purpose**: Add new product category
  - **Access**: Admin role required
  - **Body**: { name, description, parentCategory?, image? }

- `PUT /categories/:id` - Update category (Admin)
  - **Purpose**: Update category information
  - **Access**: Admin role required
  - **Body**: { category fields to update }

- `DELETE /categories/:id` - Delete category (Admin)
  - **Purpose**: Remove category (only if no products assigned)
  - **Access**: Admin role required

### Orders (🚧 To Be Implemented)
- `GET /orders` - Get orders
  - **Purpose**: Retrieve orders (admin: all orders, user: own orders)
  - **Access**: Authenticated (scope based on role)
  - **Query**: ?status=filter&page=1&limit=20
  - **Response**: { orders[], total, pagination }

- `GET /orders/:id` - Get single order
  - **Purpose**: Retrieve detailed order information
  - **Access**: Authenticated (admin: any order, user: own order only)
  - **Response**: { complete order details with items and status }

- `POST /orders` - Create order
  - **Purpose**: Convert cart to order and initiate fulfillment (cash on delivery)
  - **Access**: Authenticated
  - **Body**: { shippingAddress, billingAddress?, notes? }
  - **Response**: { created order with paymentMethod: 'cash_on_delivery' }

- `PATCH /orders/:id/status` - Update order status
  - **Purpose**: Update order fulfillment status
  - **Access**: Admin (all statuses), User (cancel only)
  - **Body**: { status, notes? }

- `PATCH /orders/:id/payment-status` - Mark order as paid (Admin only)
  - **Purpose**: Confirm payment after cash on delivery
  - **Access**: Admin role required
  - **Body**: { paymentStatus: 'paid', paymentConfirmationId?, notes? }

### Payments (🚧 Pick Up on Delivery Implementation)
- **Payment Model**: Orders are unpaid by default; admin marks as paid after delivery
- **No online payment endpoints**: Cash on delivery system
- **Admin payment confirmation**: Manual payment status updates
- **Payment history endpoints**: Available for admin reporting

### Admin (🚧 To Be Implemented)
- `GET /admin/stats` - Dashboard statistics
  - **Purpose**: Retrieve comprehensive dashboard metrics
  - **Access**: Admin role required
  - **Response**: { sales stats, user counts, product metrics, order summaries }

- `GET /admin/orders` - Manage all orders
  - **Purpose**: Admin order management interface
  - **Access**: Admin role required
  - **Query**: Advanced filtering and search options

- `GET /admin/users` - Manage users
  - **Purpose**: User administration and management
  - **Access**: Admin role required
  - **Features**: User search, role management, account status

- `GET /admin/products` - Manage products
  - **Purpose**: Product administration interface
  - **Access**: Admin role required
  - **Features**: Bulk operations, inventory management, SEO tools

> **⚠️ Important Implementation Notes:**
> - **Postman Collections**: Create comprehensive Postman collection after each backend feature is completed
> - **API Documentation**: Generate Swagger/OpenAPI documentation for all endpoints
> - **Error Handling**: Consistent error responses with proper HTTP status codes
> - **Validation**: Input validation on all endpoints with detailed error messages
> - **Rate Limiting**: Implement rate limiting on all public endpoints
> - **Testing**: E2E tests for all endpoints with comprehensive test data
> - **Security**: JWT authentication, RBAC, input sanitization on all routes

## 🧪 Available Scripts (Planned)

### Backend (NestJS) - To Be Created
```bash
cd backend

# Development
pnpm run start:dev     # Development server with hot reload
pnpm start             # Production server
pnpm run build         # Build for production

# Testing (No tests currently - implementation needed)
pnpm test              # Run unit tests
pnpm run test:e2e      # Run e2e tests (to be implemented)
pnpm run test:cov      # Run tests with coverage
pnpm run test:watch    # Run tests in watch mode

# Code Quality
pnpm run lint          # ESLint validation
pnpm run lint:fix      # Auto-fix ESLint issues
pnpm run format        # Format code with Prettier

# Database & Utilities (Planned)
pnpm run seed          # Seed database with sample data
pnpm run backup        # Backup database
```

### Frontend (Next.js) - To Be Created
```bash
cd frontend

# Development
pnpm dev               # Development server (http://localhost:3000)
pnpm run build         # Production build
pnpm start             # Start production server

# Testing & Quality (Planned)
pnpm test              # Run tests
pnpm run lint          # ESLint validation
pnpm run lint:fix      # Auto-fix ESLint issues

# Analysis (Planned)
pnpm run analyze       # Bundle analyzer
pnpm run type-check    # TypeScript type checking
```

### Project-wide (To Be Implemented)
```bash
# Install all dependencies
pnpm install

# Build both frontend and backend (when implemented)
pnpm run build:all

# Run all tests (when implemented)
pnpm run test:all

# Lint entire project (when implemented)
pnpm run lint:all
```

## 🧭 Development & Contribution Instructions

### Task Management & Workflow (!TM)
- **Task System**: Systematic task planning with clear dependencies and completion criteria
- **Task Execution**: Use MCP Shrimp Task Manager (`!TM`) to execute tasks systematically
- **Progress Tracking**: Each task is atomic, traceable, and builds upon previous ones
- **Task Management UI**: Available at http://localhost:36255?lang=en when GUI is enabled
- **Postman Collections**: **REQUIRED** - Create comprehensive Postman collection after each backend task completion

### Project Rules & Standards
- **Development Guidelines**: Comprehensive rules in `.github/instructions/project.instructions.md`
- **VS Code Configuration**: MCP servers configured in `.vscode/mcp.json`
- **Package Management**: pnpm-only enforced across entire project (no npm/yarn allowed)

### Backend Development Requirements
- **Feature Implementation**: Each backend feature must include:
  - Controllers with all CRUD operations and proper error handling
  - Services with business logic and data validation
  - DTOs with comprehensive input validation
  - Database schemas with proper indexing and relationships
  - Unit and E2E tests with full coverage
  - **Postman Collection**: Complete API testing collection with all endpoints, request examples, and test scripts
  - API documentation updates
  - Error handling and edge case coverage

### API Documentation & Testing Requirements
- **Postman Collections**: After completing each backend task, you MUST:
  - Create/update Postman collection for all implemented endpoints
  - Include request examples with various scenarios (success, error, edge cases)
  - Add test scripts for automatic validation
  - Document expected responses and status codes
  - Include authentication tokens and environment variables
  - Export collection for team sharing and CI/CD integration

- **API Documentation**: Generate comprehensive documentation including:
  - Endpoint descriptions and purposes
  - Request/response schemas
  - Authentication requirements
  - Error codes and messages
  - Usage examples and best practices

### Implementation Order (Updated - Project Start Phase)
1. 🚧 **Backend Infrastructure** (Next): Configuration, database, security, error handling
2. 🚧 **Authentication & Authorization** (Next): JWT, RBAC, guards, strategies
3. 🚧 **User Management** (Next): Profiles, addresses, roles, file upload
4. 🚧 **Product Catalog** (Next): CRUD, filtering, search, bulk operations, reviews
5. 🚧 **Shopping Cart** (Next): Full CRUD, persistence, validation, testing
6. 🚧 **Categories** (Next): Hierarchical structure, controller implementation
7. 🚧 **Orders & Payments** (Next): Order lifecycle, cash on delivery
8. 🚧 **Frontend Foundation** (Next): UI components, state management, routing
9. 🚧 **Frontend Features** (Next): Product catalog, cart UI, checkout flow
10. 🚧 **Admin Dashboard** (Next): Management interfaces, analytics
11. 🚧 **Notifications** (Next): Email, in-app, real-time notifications
12. 🚧 **Testing & Documentation** (Final): Comprehensive testing, API documentation

### Core Development Standards (To Be Implemented)
- **Architecture**: Feature-sliced design for both backend (NestJS) and frontend (Next.js)
- **Type Safety**: Strict TypeScript everywhere with zero `any` types
- **Package Management**: pnpm-only enforcement (violations blocked)
- **Code Quality**: Automated ESLint + Prettier with pre-commit hooks
- **Testing**: Comprehensive test coverage (unit, integration, e2e)
- **Documentation**: All features documented in code and README
- **Security**: JWT auth, input validation, CORS, rate limiting, helmet
- **Database**: MongoDB with Mongoose, proper indexing, connection pooling
- **Error Handling**: Global exception filters, validation pipes, user-friendly responses

### Integration Requirements (Planned)
- **API Documentation**: Swagger documentation for all endpoints
- **Postman Collections**: API testing collections for all routes (required after each backend task)
- **Frontend → API**: Type-safe API client integration
- **Real-time Features**: WebSocket notifications and updates
- **File Management**: Cloudinary integration for image handling

### Architecture Principles
- **Feature-Sliced Design**: Group by feature, not by file type
- **Type Safety**: Shared interfaces between frontend/backend
- **Security First**: Authentication, authorization, validation, sanitization
- **Performance**: Query optimization, caching, lazy loading
- **Testing**: Unit, integration, and e2e test coverage
- **Scalability**: Modular architecture supporting horizontal scaling

## 🧠 Planning & Task Management (!C7 + !TM)

### Advanced Task Management System
- **MCP Shrimp Task Manager**: Integrated task management with VS Code
- **Task GUI**: Web interface at http://localhost:36255?lang=en
- **Systematic Implementation**: Complete implementation roadmap with dependencies
- **Context7 Integration**: AI-powered planning and context management

### Task Execution Strategy
- **!C7**: Context7 for planning, research, and architecture thinking
- **!TM**: Shrimp Task Manager for systematic task execution
- **Atomic Design**: All tasks are atomic, connected, and traceable
- **Dependency Management**: Clear task dependencies and execution order
- **Progress Tracking**: Real-time task status and completion tracking

### Current Implementation Status (Project Planning Phase)
**📋 Planned Tasks (All to be implemented):**
1. Backend Project Structure and Dependencies Setup
2. Backend Environment and Configuration Setup  
3. Backend MongoDB Connection and Database Setup
4. Backend Authentication System Implementation
5. Backend User Management System
6. Backend Product Management System
7. Backend Shopping Cart Implementation
8. Backend Testing and Quality Assurance
9. Backend Category Management System
10. Backend Order Management System
11. Backend Payment Integration (Cash on Delivery)
12. Backend Notification System
13. Frontend Project Structure and Configuration
14. Frontend Authentication Implementation
15. Frontend Product Catalog Implementation
16. Frontend Shopping Cart Implementation
17. Frontend Checkout and Order Management
18. Frontend Admin Dashboard
19. Frontend Notification System
20. System Integration and API Documentation
21. Final Testing, Optimization and Documentation

### Development Workflow (To Be Established)
- **Feature Branches**: Each task executed in dedicated feature branch
- **Code Review**: All changes reviewed for quality and architecture compliance
- **Testing**: Each task includes comprehensive test coverage
- **Documentation**: Real-time documentation updates with each task
- **Quality Gates**: ESLint, Prettier, TypeScript checks enforced
- **Postman Collections**: Create and update API testing collections after each backend task completion

## � Security Features

### Authentication & Authorization
- **JWT Implementation**: Secure token-based authentication with refresh tokens
- **Role-Based Access Control (RBAC)**: Customer, Admin, Vendor roles with granular permissions
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Secure token storage and validation
- **Route Protection**: Global guards with route-specific role requirements

### Input Validation & Sanitization
- **DTO Validation**: class-validator with comprehensive validation rules
- **Global Validation Pipe**: Automatic input validation and sanitization
- **SQL Injection Prevention**: Mongoose ODM with parameterized queries
- **XSS Protection**: Input sanitization and output encoding

### Security Headers & Configuration
- **Helmet Integration**: Security headers (CSP, HSTS, X-Frame-Options)
- **CORS Configuration**: Properly configured cross-origin resource sharing
- **Rate Limiting**: API endpoint protection against abuse
- **Environment Security**: Sensitive data in environment variables only

### Error Handling & Logging
- **Global Exception Filter**: Consistent error responses without data leakage
- **Security Logging**: Authentication attempts and security events
- **Error Sanitization**: No sensitive information in client responses

## 🎨 UI/UX Features

### Design System (Planned)
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Dark Mode Support**: System preference detection and manual toggle
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Accessibility**: WCAG 2.1 AA compliance with ARIA labels and keyboard navigation

### Component Library (Planned)
- **Atomic Design**: Scalable component hierarchy (atoms, molecules, organisms)
- **TypeScript Props**: Fully typed component interfaces
- **Variant System**: Flexible component variations with Tailwind variants
- **Animation Library**: Smooth transitions and micro-interactions

### User Experience (Planned)
- **Loading States**: Skeleton screens and progress indicators
- **Error Boundaries**: Graceful error handling with recovery options
- **Toast Notifications**: Color-coded feedback (red=error, orange=warning, green=success)
- **Form Validation**: Real-time validation with helpful error messages

## 🚀 Deployment

### Backend Deployment
- **Docker Support**: Containerized deployment with multi-stage builds
- **Environment Configuration**: Production-ready environment setup
- **Health Checks**: Endpoint monitoring and health verification
- **Process Management**: PM2 or similar for production process management

### Frontend Deployment
- **Vercel Integration**: Optimized for Vercel platform deployment
- **Static Generation**: SSG for performance optimization
- **CDN Integration**: Asset optimization and global distribution
- **Build Optimization**: Bundle analysis and performance monitoring

### Infrastructure (Planned)
- **MongoDB Atlas**: Managed database with backup and scaling
- **Cloudinary**: Image storage and optimization service
- **Cash on Delivery**: Payment confirmation after delivery (no online payment processing)
- **Email Service**: Production email delivery with templates

## 🧪 Testing

### Backend Testing (To Be Implemented)
- **E2E Testing**: Comprehensive endpoint testing with real database
- **Unit Testing**: Service and utility function testing
- **Test Isolation**: Unique test data and proper cleanup
- **Coverage Reporting**: Code coverage tracking and reporting

### Current Test Status
```
No tests currently implemented.
All testing infrastructure needs to be created.

Testing will include:
- Authentication system testing
- Product management testing  
- Cart functionality testing
- Order processing testing
- User management testing
- API endpoint validation
- Database integration testing
```

### Testing Strategy (Planned)
- **Frontend Testing**: Component testing with React Testing Library
- **Integration Testing**: Full user flow testing
- **Performance Testing**: Load testing and performance benchmarks
- **Security Testing**: Vulnerability scanning and penetration testing

## 📈 Performance Optimizations

### Backend Performance
- **Database Indexing**: Strategic indexes on frequently queried fields
- **Connection Pooling**: Optimized MongoDB connection management
- **Query Optimization**: Efficient aggregation pipelines and projections
- **Caching Strategy**: Redis integration for session and data caching (planned)

### Frontend Performance (Planned)
- **Code Splitting**: Dynamic imports and route-based splitting
- **Image Optimization**: Next.js Image component with Cloudinary
- **Bundle Analysis**: Webpack bundle optimization and tree shaking
- **Service Workers**: PWA capabilities with offline support

### Monitoring & Analytics (Planned)
- **Performance Monitoring**: Real-time performance tracking
- **Error Tracking**: Comprehensive error monitoring and alerting
- **User Analytics**: Usage patterns and behavior analysis
- **API Monitoring**: Endpoint performance and availability tracking

## 🤝 Contributing

### Getting Started
1. **Fork the Repository**: Create your own fork of the project
2. **Clone Locally**: `git clone <your-fork-url>`
3. **Install Dependencies**: `pnpm install` (pnpm only!)
4. **Environment Setup**: Copy `.env.example` files and configure
5. **Run Tests**: Ensure all tests pass before starting

### Development Workflow
1. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Follow Task System**: Use `!TM` for guided implementation
3. **Code Standards**: ESLint and Prettier enforced
4. **Testing**: Add tests for all new functionality
5. **Documentation**: Update README and inline docs
6. **Pull Request**: Submit PR with clear description and testing

### Code Review Process
- **Architecture Review**: Feature-sliced design compliance
- **Security Review**: Authentication, authorization, input validation
- **Performance Review**: Query optimization and bundle size
- **Test Review**: Coverage and quality of test cases
- **Documentation Review**: Accuracy and completeness

### Contribution Guidelines
- **Follow shrimp-rules.md**: Comprehensive development guidelines (217 lines)
- **Use pnpm Only**: No npm or yarn allowed in any part of the project
- **TypeScript Strict**: No `any` types, full type safety required
- **Feature-Sliced Architecture**: Maintain clean module boundaries
- **Security First**: All code must pass security review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marjan Shuplinoski**
- GitHub: [@marjanshuplinoski](https://github.com/marjan-shuplinoski)
- Development Environment: Manjaro KDE + VS Code (Windsurf.com)
- Specialization: Full-stack development with TypeScript, React, Node.js

## 📊 Features in Detail

### Product Management (🚧 To Be Implemented)
- **Rich Product Catalog**: Complete CRUD with advanced filtering and search
- **Product Variations**: Support for attributes, dimensions, and specifications
- **Inventory Tracking**: Real-time stock management and availability
- **Bulk Operations**: Efficient bulk create, update, and delete operations
- **Image Management**: Multiple image support with add/remove functionality
- **SEO Optimization**: Meta titles, descriptions, and keywords
- **Review System**: Product reviews with rating aggregation

### Shopping Experience (🚧 To Be Implemented)
- **Persistent Shopping Cart**: User-based cart storage with MongoDB
- **Cart Management**: Add, update, remove, clear operations
- **Price Calculations**: Automatic total calculations with validation
- **JWT Protection**: All cart operations require authentication
- **Error Handling**: Comprehensive error responses and edge cases

### User Management (🚧 To Be Implemented)  
- **Profile Management**: Complete user profile CRUD operations
- **Address Management**: Multiple address support (shipping, billing)
- **Role-Based Access**: Customer, Admin, Vendor roles with permissions
- **File Upload**: Secure profile image upload functionality
- **Search & Filter**: Admin user search and management capabilities

### Authentication & Security (🚧 To Be Implemented)
- **JWT Authentication**: Complete strategy with Passport.js integration
- **Role-Based Access Control**: Granular permissions system
- **Password Security**: bcrypt hashing with secure token management
- **Session Management**: Refresh token support and logout functionality
- **Input Validation**: Comprehensive DTO validation with class-validator

### Database & Performance (🚧 To Be Implemented)
- **MongoDB Integration**: Mongoose ODM with connection pooling
- **Strategic Indexing**: Optimized queries with proper database indexes
- **Health Monitoring**: Database health checks and connection status
- **Data Validation**: Schema-level validation with Mongoose decorators
- **Transaction Support**: Ready for order processing transactions

### Order Management (🚧 Planned)
- **Complete Order Lifecycle**: Order creation, status tracking, fulfillment
- **Order Status Management**: Pending, processing, shipped, delivered, cancelled
- **Email Notifications**: Order confirmations and status updates
- **Order History**: Complete order tracking and reordering functionality
- **Invoice Generation**: PDF invoice creation and delivery

### Payment Processing (🚧 Planned - Cash on Delivery)
- **Cash on Delivery**: Primary payment method with admin confirmation
- **Order Payment Status**: Admin marks orders as paid after delivery
- **Payment History**: Complete transaction tracking and reporting
- **Manual Payment Confirmation**: Admin interface for payment status updates

### Admin Dashboard (🚧 Planned)
- **Sales Analytics**: Revenue tracking, sales reports, and performance metrics
- **Product Management**: Advanced product administration interface
- **Order Management**: Complete order processing and fulfillment tools
- **User Management**: Customer management and support tools
- **Inventory Reports**: Stock levels, low inventory alerts, and restocking

### Frontend Experience (🚧 Planned)
- **Next.js 15**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first styling with custom design system
- **TypeScript**: Full type safety across frontend components
- **Feature-Sliced Architecture**: Scalable and maintainable code organization
- **Responsive Design**: Mobile-first approach with accessibility features
