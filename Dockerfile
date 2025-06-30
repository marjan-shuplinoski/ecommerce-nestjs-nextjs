# syntax=docker/dockerfile:1.4
FROM node:20-alpine as base
WORKDIR /app
ENV NODE_ENV=production

FROM base as deps
COPY backend/pnpm-lock.yaml ./
COPY backend/package.json ./
# Use corepack to enable pnpm, then install dependencies (no global install)
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate && pnpm --version && pnpm install --force --prod --ignore-scripts

FROM base as builder
COPY backend .
COPY --from=deps /app/node_modules ./node_modules
# Use corepack to enable pnpm in builder as well
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate && pnpm --version && pnpm build

FROM base as runner
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY backend/.env.example .env
EXPOSE 5000
CMD ["node", "dist/main.js"]
