<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Features

- Feature-sliced architecture (NestJS, Mongoose, TypeScript)
- Category schema/model: name, slug (unique, auto-generated), parentCategory (hierarchy), productCount, status, isDeleted
- Hierarchical support (parentCategory, tree building)
- Slug auto-generation and unique validation
- Product count tracking
- Indexes: name, slug (unique), parentCategory
- Soft delete (isDeleted, status)
- Static method for category tree
- Full Jest test coverage
- Documentation and TODOs up to date

## JWT Authentication Service and Strategy

This project implements robust JWT authentication using NestJS, Passport, and strict TypeScript. Includes:
- Access and refresh tokens
- Passport JWT strategies (access, refresh)
- JWT guards
- Authentication DTOs with comprehensive validation
- Custom validation decorators (password matching)
- Notification integration for all auth events
- Feature-sliced architecture
- Full Jest unit/integration test coverage

### Authentication DTOs
- **RegisterDto**: User registration with name, email, password validation
- **LoginDto**: User login with email and password
- **ForgotPasswordDto**: Password reset request with email validation
- **ResetPasswordDto**: Password reset with token and new password validation
- **Custom Validators**: Password match validation for registration and reset

### Usage
- Import `AuthModule` from `src/features/auth/` in your feature modules.
- Use `JwtAuthGuard` and `RefreshTokenGuard` to protect routes.
- Inject `JwtService` for token operations.
- Import DTOs: `RegisterDto`, `LoginDto`, `ForgotPasswordDto`, `ResetPasswordDto`

### Environment Variables
- `JWT_ACCESS_SECRET` (required)
- `JWT_REFRESH_SECRET` (required)

### Tests
```bash
pnpm run test src/features/auth/
```

### Documentation
- See `/docs/prd/jwt-authentication-service-and-strategy.prd.md`
- See `/docs/todos/jwt-authentication-service-and-strategy.todos.md`

### CI/CD
- All code and tests are CI-ready and linted.
- Uses pnpm, strict TypeScript, and project standards.

## Product Service

Implements CRUD, advanced filtering, and search for products. All endpoints return notification objects for consistent API feedback.

### Endpoints
- `POST /products` — Create product (body: CreateProductDto)
- `GET /products/:id` — Get product by ID
- `PUT /products/:id` — Update product (body: UpdateProductDto)
- `DELETE /products/:id` — Delete product
- `GET /products` — Filter/search products (query: FilterProductDto)

### Usage Example
```bash
curl -X POST http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Sample Product","price":99.99,"category":"electronics"}'
```

### DTOs
- `CreateProductDto`, `UpdateProductDto`, `FilterProductDto` (see `src/features/products/dto/`)

### Notification Integration
All responses include a `notification` object for success/error feedback.

### Tests
- See `src/features/products/services/product.service.spec.ts` for full Jest coverage.
