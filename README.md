# Playwright E2E Tests

This directory contains all Playwright end-to-end tests for the merchandise store application.

## Structure

```
playwright-tests/
├── pages/              # Page Object Models
│   ├── LoginPage.ts
│   ├── ProductStorePage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── ThankYouPage.ts
│   └── EmailPage.ts
├── tests/              # Test files
│   ├── example.spec.ts
│   └── fixtures.ts    # Playwright fixtures for Page Objects
├── playwright.config.ts
├── package.json
└── .gitignore
```

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug
```

## Test Structure

Tests follow the Arrange-Act-Assert (AAA) pattern:
- **Arrange**: Setup and prepare test data
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

## Page Object Model

All page interactions are encapsulated in Page Object classes located in the `pages/` directory. These classes use declarative method names that describe business actions rather than technical implementation.

