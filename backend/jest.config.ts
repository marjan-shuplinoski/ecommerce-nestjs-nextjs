import type { Config } from '@jest/types';

const config: Config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/src/**/*.spec.ts',
        '<rootDir>/src/**/__tests__/**/*.spec.ts',
    ],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/'
    ],
    extensionsToTreatAsEsm: ['.ts'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.module.ts',
        '!src/main.ts',
        '!src/**/__tests__/*',
    ],
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'lcov'],
    globals: {},
};

export default config;
