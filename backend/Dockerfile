# Backend Dockerfile for NestJS (pnpm, strict, CI/CD ready)
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only package files for install step
COPY package.json pnpm-lock.yaml ./

# Install dependencies (faster with pnpm)
RUN pnpm install --frozen-lockfile --prod=false

# Copy rest of the code
COPY . .

# Build the app
RUN pnpm build

# Expose port (default NestJS)
EXPOSE 5000

# Start the app
CMD ["pnpm", "start:prod"]
