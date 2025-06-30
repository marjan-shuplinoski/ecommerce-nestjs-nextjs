import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-console': 'warn',
    },
    ignorePatterns: ['dist/', 'node_modules/'],
});
