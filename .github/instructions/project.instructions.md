# project.instructions.md

## GitHub Copilot & Contributor Instructions

Follow these rules and standards for all code, documentation, and workflow in this project. These instructions are mandatory for all contributors and Copilot suggestions.

---

### 1. Architecture & Stack
- Use **feature-sliced architecture** for both frontend (Next.js) and backend (NestJS).
- Use **TypeScript everywhere** (strict mode, no `any`).
- Organize code by feature, not by type. Each feature gets its own folder with logic, types, and helpers.
- Use `index.ts` as the entry point for modules.

### 2. Dependency Management
- **pnpm is the only allowed package manager.** Never use npm or yarn.
- Always use the latest stable package versions.

### 3. Code Quality & Formatting
- Enforce **ESLint + Prettier** (auto-fix on save/commit).
- Remove unused imports, variables, and dead code automatically.
- All code must be clean, readable, and self-explanatory.

### 4. Code Quality
- All new features, endpoints, and architecture decisions must be documented in `/docs/` using kebab-case markdown files.
- PRDs go in `docs/prd/`, TODOs in `docs/todos/`.
- Keep README.md and docs in sync with code changes.

### 5. Security & Best Practices
- All config/secrets must use environment variables. Never hardcode sensitive data.
- Always validate and sanitize input/output.
- Handle errors securely and never leak sensitive info.
- Use RBAC for protected routes/APIs.

### 6. Workflow
- Use feature branch workflow and atomic, conventional commits (e.g., `feat:`, `fix:`, `docs:`).
- All PRs must update PRD/TODOs and keep documentation current.
- Run lint and format before every commit.

### 7. UI/UX & Accessibility
- All UI must be accessible and mobile-friendly.
- Follow accessibility best practices for all components.

### 9. CI/CD & DevOps
- All scripts must be CI-friendly and reproducible.
- Docker support is required for local and cloud deployment.

---
### 10. Readme.md
- Use references to the project structure and features from README.md file.
- The README.md must provide a clear and concise overview of the project.
- Include sections for features, installation, usage, and contribution guidelines.
- Keep the README.md up to date with the latest changes and features.

**Copilot and all contributors must strictly follow these rules. If in doubt, default to the most secure, scalable, and maintainable solution.**
