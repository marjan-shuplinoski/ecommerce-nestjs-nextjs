# Frontend

This is the Next.js 14 frontend for the Ecommerce-Nestjs-Nextjs project.

## Features
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS (dark mode enabled)
- ESLint + Prettier
- Feature-sliced architecture: `/src/app`, `/src/features`, `/src/shared`
- **Category Management UI**: Modular components for category browsing, tree navigation, and admin management (`/src/features/category`)
- **Advanced Search and Filtering UI**: SearchFilters, PriceRangeSlider, BrandFilter, RatingFilter, SortingOptions components implemented in `src/features/search/`
- **Authentication UI Components**: LoginForm, RegisterForm, ResetPasswordForm, AuthLayout implemented in `src/features/auth/components/`
  - All components tested and validated
  - See PRD and TODO for details
- **Authentication Pages and Routing**: Login, Register, Reset Password pages in `src/app/auth/`, context/hooks in `src/features/auth/`, JWT management, protected routes, notifications
  - All components and hooks tested and validated
  - See `docs/prd/authentication-pages-and-routing.prd.md` and `docs/todos/authentication-pages-and-routing.todos.md`
- Environment variable support (`.env.example`)
- API client configuration in `/src/shared/api.ts`

## Getting Started

```sh
pnpm install
pnpm dev
```

## Project Structure

- `src/app` – App router, layouts, pages
- `src/features` – Feature modules (per business domain)
- `src/shared` – Shared utilities, API client, types

## Configuration
- Edit `.env.example` and copy to `.env.local` for local development
- Tailwind config: `tailwind.config.ts`
- TypeScript config: `tsconfig.json`
- ESLint config: `eslint.config.mjs`

## Contribution
- Use feature branches
- Run `pnpm lint` before commit
- Keep docs and code in sync
