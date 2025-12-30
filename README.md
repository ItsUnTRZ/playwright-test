# Playwright E2E Tests

Playwright end-to-end tests for merchandise store application using Page Object Model pattern.

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode (Recommended)
```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Debug tests
```bash
npx playwright test --debug
```

### Run specific test file
```bash
npx playwright test tests/example.spec.ts
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### List all tests
```bash
npx playwright test --list
```

### Show test report
```bash
npx playwright show-report
```

## Project Structure

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
│   └── fixtures.ts     # Playwright fixtures
├── playwright.config.ts
└── package.json
```

