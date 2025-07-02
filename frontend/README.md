# Frontend

This is the Next.js 14 frontend for the Ecommerce-Nestjs-Nextjs project.

## Features
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS (dark mode enabled)
- ESLint + Prettier
- Feature-sliced architecture: `/src/app`, `/src/features`, `/src/shared`
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
