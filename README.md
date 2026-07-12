# Playwright Automation Framework - PrestaShop Demo

This project contains an end-to-end automation framework built using **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

The framework automates the critical user journeys of the PrestaShop Demo Store including user registration, login, product search, cart management, and checkout.

---

# Tech Stack

- Playwright
- TypeScript
- Faker.js
- Page Object Model (POM)
- Playwright HTML Reporter
- Git & GitHub

---

# Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
│
├── Screenshot/                     # README screenshots
│   ├── Screenshot.png
│   ├── Screenshot-1.png
│   ├── Screenshot-2.png
│   └── Screenshot-3.png
│
├── tests/
│   ├── pages/
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── SearchPage.ts
│   │   ├── ProductPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── OrderSuccessPage.ts
│   │
│   ├── utils/
│   │   ├── faker.ts
│   │   ├── authHelper.ts
│   │   └── cartHelper.ts
│   │
│   ├── registration.spec.ts
│   ├── login.spec.ts
│   ├── search.spec.ts
│   ├── cart.spec.ts
│   └── purchase.spec.ts
│
├── playwright-report/
├── test-results/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Folder Explanation

## pages/

Contains all Page Object Model classes.

Each page contains:

- Locators
- Actions
- Assertions

Examples:

- **HomePage.ts** → Homepage actions
- **LoginPage.ts** → Login functionality
- **RegisterPage.ts** → User registration
- **SearchPage.ts** → Product search functionality
- **ProductPage.ts** → Product interactions
- **CartPage.ts** → Cart operations
- **CheckoutPage.ts** → Checkout process
- **OrderSuccessPage.ts** → Order confirmation validation

---

## utils/

Contains reusable helper functions.

### faker.ts

Generates dynamic user data using Faker.

### authHelper.ts

Contains reusable authentication methods.

### cartHelper.ts

Contains reusable methods for adding products to the cart.

---

## tests/

Contains all Playwright test suites.

Current test suites:

- Registration
- Login
- Product Search
- Cart
- Purchase Flow

---

# Test Coverage

## 👤 User Registration (7 Tests)

- Register a new customer successfully
- Logout after successful registration
- Prevent duplicate email registration
- Validate invalid email format
- Validate weak password
- Validate minimum password length
- Validate required registration fields
- Verify Terms & Conditions acceptance

---

## 🔐 User Login (8 Tests)

- Login successfully with a newly registered user
- Logout after successful login
- Validate empty email and password
- Validate empty email
- Validate empty password
- Validate invalid email format
- Prevent login with incorrect password
- Prevent login with an unregistered email
- Login again after logout

---

## 🔍 Product Search (2 Tests)

- Search for an existing product
- Verify search results are displayed
- Verify product price is displayed
- Verify product image is displayed
- Search for a non-existing product
- Verify "No search results" message is displayed

---

## 🛒 Shopping Cart (2 Tests)

- Add a product to the shopping cart
- Verify the selected product is displayed in the cart
- Remove a product from the shopping cart
- Verify successful product removal

---

## 💳 Purchase Flow (1 End-to-End Test)

- Search for a product
- Add the product to the cart
- Update product quantity
- Proceed to checkout
- Fill personal information
- Enter shipping address
- Select shipping method
- Choose Cash on Delivery payment
- Accept Terms & Conditions
- Place the order
- Verify successful order confirmation

---

## 📊 Automation Summary

| Test Suite                | Test Cases |
| ------------------------- | ---------: |
| User Registration         |          7 |
| User Login                |          8 |
| Product Search            |          2 |
| Shopping Cart             |          2 |
| Purchase Flow             |          1 |
| **Total Automated Tests** |     **20** |

---

# Installation

Clone repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Running Tests

Run all tests

```bash
npx playwright test
```

Run a specific test

```bash
npx playwright test tests/login.spec.ts
```

Run in headed mode

```bash
npx playwright test --headed
```

Run with one retry

```bash
npx playwright test --retries=1
```

---

# HTML Report

Generate report

```bash
npx playwright show-report
```

---

# Framework Features

- Page Object Model (POM)
- TypeScript
- Reusable Page Objects
- Reusable Helper Methods
- Dynamic Test Data using Faker
- HTML Reporting
- Retry Support
- Parallel Execution
- GitHub Actions CI/CD Ready
- Easy Maintenance

---

# Screenshots

!(Screenshot/Screenshot.png)

!(Screenshot/Screenshot-1.png)

!(Screenshot/Screenshot-2.png)

!(Screenshot/Screenshot-3.png)

# Author

**Saugat Paudel**

**QA Engineer**

**Skills**

- Playwright
- TypeScript
- API Testing
- Automation Testing
- Page Object Model (POM)
