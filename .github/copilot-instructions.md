# Playwright Automation Project

This is a Playwright test automation framework with TypeScript and Page Object Model pattern.

## Project Setup Checklist

- [x] Project structure created
- [x] Dependencies configured in package.json
- [x] Playwright configuration created
- [x] TypeScript configuration created
- [x] Page Object Model base classes created
- [ ] Install dependencies
- [ ] Run first test
- [ ] Configure CI/CD (if needed)

## Getting Started

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Run tests in headed mode: `npm run test:headed`
4. View test report: `npm run test:report`
5. Generate test code: `npm run test:codegen`

## Project Structure

```
/tests
  /pages          - Page Object Model classes
  /utils          - Utility functions
  example.spec.ts - Example test file
playwright.config.ts - Playwright configuration
package.json     - Project dependencies
tsconfig.json    - TypeScript configuration
```

## Key Features

- TypeScript support with strict mode
- Page Object Model pattern for better maintainability
- Example tests using Playwright
- HTML test reports
- Support for multiple browsers (Chromium, Firefox, WebKit)
- Screenshots and videos on test failures
