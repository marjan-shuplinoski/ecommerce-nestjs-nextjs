module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};
