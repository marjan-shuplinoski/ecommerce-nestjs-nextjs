# Product Review and Rating System UI – TODO

## Status
- In Progress

## Overview
UI for product reviews and ratings, including submission, filtering, and helpful votes. Integrates with backend review endpoints.

## Description
Implements ReviewForm, ReviewList, RatingStars, ReviewFilters. Supports image upload, voting, and moderation UI. All code is TypeScript, feature-sliced, and tested.

## Frontend Tasks
- [x] Create ReviewForm component
- [x] Create ReviewList component
- [x] Create RatingStars component
- [x] Create ReviewFilters component
- [x] Add image upload to ReviewForm
- [x] Add helpful vote button to ReviewList
- [x] Add moderation UI placeholder
- [x] Write unit tests for all components
- [x] Lint and format code

## Backend Tasks
- [ ] Integrate with review API endpoints (separate task)

## Dependencies
- Product detail page (done)
- Backend review endpoints (pending)

## Testing Requirements
- All components have unit tests
- Tests pass with no errors
- Lint passes for all code

## Documentation
- PRD: docs/prd/product-review-and-rating-system-ui.prd.md
- Code: frontend/src/features/reviews/
