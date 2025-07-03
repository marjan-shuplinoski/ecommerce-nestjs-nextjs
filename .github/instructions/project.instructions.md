# project.instructions.md

## Contributor & Copilot Project Instructions

All contributors and Copilot must strictly follow these rules, which are based on the official project templates, development workflow, and testing guide. These instructions are mandatory for all code, documentation, and workflow in this project.

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

### 4. Documentation & PRD/TODO Management
- All features/modules must have a PRD in `docs/prd/` and a matching TODO in `docs/todos/`.
- PRDs must follow `docs/templates/prd_template.md` and include: overview, problem statement, goals, user stories, technical requirements, test plan, traceability, and task status.
- TODOs must follow `docs/templates/todo_template.md` and include: status, overview, description, backend/frontend tasks, dependencies, testing requirements, and documentation.
- All tasks and features must be traceable between PRD and TODO.
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

### 7. Testing & Validation
- Always include a test per function, component, or endpoint.
- Follow the structure and naming in `docs/testing_guide.md`:
  - Unit tests: `*.spec.ts` (e.g., `user.service.spec.ts`)
  - Integration tests: `[module].integration.spec.ts`
  - E2E tests: `[feature].e2e-spec.ts`
- Place tests in `backend/test/unit/`, `backend/test/integration/`, and `backend/test/e2e/` as appropriate.
- Use Jest and follow the AAA pattern (Arrange, Act, Assert).
- Aim for 80%+ test coverage.
- All tests must be isolated, predictable, and reproducible.

### 8. Code Review Checklist
- [ ] Documentation exists and is up to date (PRD, TODO, README)
- [ ] Tests are written and passing (unit, integration, E2E)
- [ ] Code follows project standards and templates
- [ ] Error handling is implemented and secure
- [ ] Performance considerations are addressed

### 9. UI/UX & Accessibility
- All UI must be accessible and mobile-friendly.
- Follow accessibility best practices for all components.

### 10. CI/CD & DevOps
- All scripts must be CI-friendly and reproducible.
- Docker support is required for local and cloud deployment.

---
### 10. Readme.md
- Use references to the project structure and features from README.md file.
- The README.md must provide a clear and concise overview of the project.
- Include sections for features, installation, usage, and contribution guidelines.
- Keep the README.md up to date with the latest changes and features.

**Copilot and all contributors must strictly follow these rules. If in doubt, default to the most secure, scalable, and maintainable solution.**
