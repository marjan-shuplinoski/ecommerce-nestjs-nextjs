# Development Workflow Requirements

## Documentation Requirements

### PRD (Product Requirements Document)
- **Location**: `docs/prd/`
- **Requirements**:
  - Each feature must have a corresponding PRD document
  - Follow the template in `docs/templates/prd_template.md`
  - Include user stories, acceptance criteria, and technical considerations

### TODOs
- **Location**: `docs/todos/`
- **Requirements**:
  - Create a markdown file for each feature/module
  - Track implementation progress with checkboxes
  - Include technical debt items and future improvements

## Testing Requirements

### Backend Tests
- **Location**: `backend/test/`
- **Requirements**:
  - Write tests using Jest
  - Follow the AAA pattern (Arrange, Act, Assert)
  - Test files should be named `*.spec.ts` or `*.test.ts`
  - Aim for 80%+ test coverage

### Test Categories
1. **Unit Tests**
   - Test individual functions and methods
   - Mock external dependencies
   - Place in `test/unit/` directory

2. **Integration Tests**
   - Test service interactions
   - Test database operations
   - Place in `test/integration/` directory

3. **E2E Tests**
   - Test API endpoints
   - Test complete user flows
   - Place in `test/e2e/` directory

## Code Review Checklist
- [ ] Documentation exists and is up to date
- [ ] Tests are written and passing
- [ ] Code follows project standards
- [ ] Error handling is implemented
- [ ] Performance considerations are addressed
