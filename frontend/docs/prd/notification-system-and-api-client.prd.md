# Notification System and API Client PRD

## Overview
Implement a centralized notification system and API client for the Next.js frontend using feature-sliced architecture, strict TypeScript, and best practices.

## Problem Statement
Users and developers need a consistent, reliable, and testable way to display notifications and handle API errors across the frontend.

## Goals
- Centralize notification logic and UI
- Standardize API error handling and messaging
- Ensure strict typing and test coverage
- Enable easy customization and future extension

## User Stories
- As a user, I want to see clear, consistent notifications for all actions and errors.
- As a developer, I want to trigger notifications and handle API errors with minimal boilerplate.

## Technical Requirements
- Use `react-hot-toast` for notifications
- Use `axios` for API client
- Provide NotificationContext/provider and hooks
- Centralize error normalization and notification logic
- Strict TypeScript, no `any`
- Full test coverage (Jest, RTL)
- Lint/test clean

## Test Plan
- Unit test notification context/provider, service, and API client
- Integration test notification flows in components
- Mock API errors and verify notification display

## Traceability
- All requirements mapped to code, tests, and docs

## Task Status
- [x] PRD written
- [ ] Implementation in progress
- [ ] Tests complete
- [ ] Docs complete
