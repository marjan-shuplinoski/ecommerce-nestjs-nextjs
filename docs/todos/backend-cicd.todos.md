# Backend CI/CD - TODO

## Overview
- **Status:** In Progress
- **Priority:** P0
- **Target Date:** 2025-07-08
- **Assigned To:** @marjan

## Description
Automate backend build, test, and deployment with Docker, docker-compose, pnpm, and GitHub Actions. Document and validate all steps.

## Completed
- [x] Dockerfile for backend
- [x] docker-compose.yml for backend + Mongo
- [x] .env.example for all required vars
- [x] GitHub Actions workflow for CI/CD
- [x] Documentation in /docs/

## Tasks
- [ ] Test validation: run pnpm lint && pnpm test and ensure all tests pass and are lint clean
- [ ] Update README with CI/CD usage

## Dependencies
- [ ] None

## Testing Requirements
- [x] Lint, test, build, Docker build in CI
- [x] .env.example covers all required vars

## Documentation
- [x] PRD in docs/prd/backend-cicd.prd.md
- [x] TODO in docs/todos/backend-cicd.todos.md
