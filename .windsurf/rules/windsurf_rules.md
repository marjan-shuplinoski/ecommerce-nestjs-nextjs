---
trigger: always_on
description: Guidelines for creating and maintaining Windsurf rules to ensure consistency and effectiveness.
globs: .windsurf/rules/*.md
---

- **Required Rule Structure:**
  ```markdown
  ---
  description: Clear, one-line description of what the rule enforces
  globs: path/to/files/*.ext, other/path/**/*
  alwaysApply: boolean
  ---

  - **Main Points in Bold**
    - Sub-points with details
    - Examples and explanations
  ```

- **File References:**
  - Use `[filename](mdc:path/to/file)` ([filename](mdc:filename)) to reference files
  - Example: [prisma.md](.windsurf/rules/prisma.md) for rule references
  - Example: [schema.prisma](mdc:prisma/schema.prisma) for code references

- **Code Examples:**
  - Use language-specific code blocks
  ```typescript
  // ✅ DO: Show good examples
  const goodExample = true;
  
  // ❌ DON'T: Show anti-patterns
  const badExample = false;
  ```

- **Rule Content Guidelines:**
  - Start with high-level overview
  - Include specific, actionable requirements
  - Show examples of correct implementation
  - Reference existing code when possible
  - Keep rules DRY by referencing other rules

- **Rule Maintenance:**
  - Update rules when new patterns emerge
  - Add examples from actual codebase
  - Remove outdated patterns
  - Cross-reference related rules

- **Best Practices:**
  - Use bullet points for clarity
  - Keep descriptions concise
  - Include both DO and DON'T examples
  - Reference actual code over theoretical examples
  - Use consistent formatting across rules
# Windsurf Documentation and Task Completion Rules

## Documentation Requirements

### PRD Documentation
- **Location**: `docs/prd/`
- **When Required**: For all new features or major changes
- **Requirements**:
  - Must be created before development starts
  - Must follow the template in `docs/templates/prd_template.md`
  - Must be reviewed and approved by the team lead

### TODO Documentation
- **Location**: `docs/todos/`
- **When Required**: For tracking implementation progress
- **Requirements**:
  - One file per feature/module
  - Must include implementation tasks
  - Must track testing requirements
  - Must be updated as work progresses

## Task Completion Workflow

### 1. Documentation
- [ ] Create/Update PRD document
- [ ] Create/Update TODO document
- [ ] Update any affected documentation

### 2. Implementation
- [ ] Write code following project standards
- [ ] Add/Update unit tests
- [ ] Add/Update integration tests
- [ ] Update API documentation if needed

### 3. Testing
- [ ] All tests must pass
- [ ] Test coverage must meet project standards
- [ ] Manual testing completed
- [ ] Edge cases verified

### 4. Review
- [ ] Code review completed
- [ ] Documentation reviewed
- [ ] Performance impact assessed
- [ ] Security considerations addressed

### 5. Completion
- [ ] All TODO items checked
- [ ] All tests passing
- [ ] Documentation updated
- [ ] PR merged to main branch

## File Naming Conventions
- PRD files: `[feature_name]_prd.md`
- TODO files: `[module_name]_todos.md`
- Test files: `[filename].spec.ts` or `[filename].test.ts`

## Templates
- Use `docs/templates/prd_template.md` for new PRDs
- Use `docs/templates/todo_template.md` for new TODO lists
