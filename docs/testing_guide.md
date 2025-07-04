# Testing Guide

## Backend Testing

### Test Structure
```
backend/
├── test/
│   ├── unit/           # Unit tests
│   │   └── services/   # Service layer tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
```

### Test Naming Conventions
- Unit tests: `[filename].spec.ts` (e.g., `user.service.spec.ts`)
- Integration tests: `[module].integration.spec.ts`
- E2E tests: `[feature].e2e-spec.ts`

### Example Test
```typescript
// user.service.spec.ts
describe('UserService', () => {
  let service: UserService;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepository = module.get(getRepositoryToken(User));
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      // Arrange
      const userId = '123';
      const mockUser = { id: userId, name: 'Test User' };
      mockRepository.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await service.findOne(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });
});
```

## Test Coverage

### Running Tests with Coverage
```bash
# Run all tests with coverage
cd backend
pnpm test -- --coverage

# Run specific test file
pnpm test -- src/users/user.service.spec.ts
```

### Coverage Thresholds
```json
// package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Best Practices

### Unit Tests
- Test one thing per test case
- Use descriptive test names
- Follow AAA pattern (Arrange-Act-Assert)
- Mock all external dependencies
- Test edge cases and error conditions

### Integration Tests
- Test service interactions
- Use test database
- Clean up after tests
- Test happy paths and error cases

### E2E Tests
- Test complete user flows
- Use test data factories
- Run in an environment that mimics production
- Test API contracts

## Debugging Tests

### VSCode Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasename}",
        "--config",
        "jest.config.js",
        "--runInBand",
        "--detectOpenHandles"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

## Common Test Utilities

### Test Data Factories
```typescript
// test/factories/user.factory.ts
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  ...overrides,
});
```

### Test Setup Helpers
```typescript
// test/test-utils.ts
export async function createTestingApp() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  
  return {
    app,
    moduleFixture,
    // Add commonly used providers here
  };
}
```
