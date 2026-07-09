# Playwright Automation Testing Framework

A modern, scalable automation testing framework built with Playwright and TypeScript, following the Page Object Model pattern.

## Features

✅ Playwright test automation framework
✅ TypeScript with strict type checking
✅ Page Object Model pattern for maintainability
✅ Multi-browser support (Chromium, Firefox, WebKit)
✅ HTML test reports with screenshots and videos
✅ Parallel test execution
✅ Debug and UI mode support
✅ Test retry mechanism

## Prerequisites

- Node.js 18+ installed
- npm package manager

## Installation

1. Navigate to the project directory:
```bash
cd Assignment
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in UI mode
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

### Generate test code using Codegen
```bash
npm run test:codegen
```

## Project Structure

```
Assignment/
├── tests/
│   ├── pages/
│   │   ├── BasePage.ts           # Base class for all page objects
│   │   └── ExamplePage.ts        # Example page object
│   ├── utils/                    # Utility functions
│   └── example.spec.ts           # Example test file
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
├── README.md                     # This file
└── .gitignore                    # Git ignore rules
```

## Page Object Model Pattern

This project uses the Page Object Model (POM) pattern for better test maintainability:

### BasePage
Base class that all page objects inherit from, containing common actions like navigation and waits.

### ExamplePage
Example page object that extends BasePage and contains page-specific locators and methods.

### Creating a New Page Object
1. Create a new file in `tests/pages/` (e.g., `LoginPage.ts`)
2. Extend `BasePage`
3. Define page locators
4. Add page-specific methods

Example:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Login")');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## Writing Tests

Example test using Page Object Model:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://example.com/login');
  await loginPage.login('user@example.com', 'password123');
  
  // Assertions
  expect(page.url()).toContain('/dashboard');
});
```

## Configuration

### Playwright Config (playwright.config.ts)
- **testDir**: Directory containing tests
- **fullyParallel**: Run tests in parallel
- **retries**: Retry failed tests
- **reporter**: Generate HTML reports
- **projects**: Define browsers to test on

### TypeScript Config (tsconfig.json)
- **strict**: Strict type checking enabled
- **paths**: Path aliases (@pages, @utils)
- **esModuleInterop**: Better ES module compatibility

## Troubleshooting

### Tests not running?
```bash
npx playwright install
npm install
npm test
```

### Browser not launching?
Ensure all dependencies are installed and browsers are installed.

### Can't find modules?
Check tsconfig.json paths configuration and ensure TypeScript paths match your imports.

## CI/CD Integration

The project is configured for CI/CD. When running in CI environment:
- Set `CI=true` environment variable
- Tests will use 2 retries
- Workers set to 1
- Screenshots and videos retained on failures

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## License

MIT
