# Development Workflow

This document outlines the core development workflow for the project, ensuring consistency and quality. All contributors must adhere to these guidelines.

## 1. Feature Development
All new features must follow a documentation-driven approach:

1.  **Create a PRD**: Define the feature in a new file in [`docs/prd/`](./prd/). Use the [`prd_template.md`](./templates/prd_template.md).
2.  **Create a TODO**: Break down the PRD into actionable tasks in a corresponding file in [`docs/todos/`](./todos/). Use the [`todo_template.md`](./templates/todo_template.md).
3.  **Implement**: Write the code, following the feature-sliced architecture.
4.  **Test**: Write tests for the new feature, following the [Testing Guide](./testing_guide.md).
5.  **Submit a Pull Request**: Ensure the PR updates the PRD and TODO status.

## 2. Testing
All code must be accompanied by tests. Refer to the **[Testing Guide](./testing_guide.md)** for detailed instructions on test structure, naming conventions, and best practices.

## 3. Code Review
All pull requests require at least one review. The review checklist is as follows:

- [ ] **Documentation**: Is the PRD/TODO updated?
- [ ] **Tests**: Are there sufficient tests, and are they passing?
- [ ] **Standards**: Does the code follow the project's architecture and style guides?
- [ ] **Error Handling**: Are errors handled gracefully and securely?
- [ ] **Performance**: Are there any obvious performance bottlenecks?
