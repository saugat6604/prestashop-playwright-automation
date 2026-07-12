import { test, expect } from "@playwright/test";
import { RegisterPage } from "../tests/pages/RegisterPage";
import { generateUser, UserData } from "../tests/utils/faker";
import { HomePage } from "@pages/HomePage";

test.describe("User Registration", () => {
  let registerPage: RegisterPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    homePage = new HomePage(page);

    await homePage.open();
  });

  test("should register a new customer successfully and logout", async () => {
    const user = generateUser();
    await registerPage.register(user);

    await registerPage.expectSuccessfulRegistration(user.firstName);

    await registerPage.logout();
  });

  test("should not allow registration with an already registered email", async () => {
    const user = generateUser();
    // Register first user
    await registerPage.register(user);

    await registerPage.logout();

    // Try registering same user again
    await registerPage.register(user);

    await registerPage.expectDuplicateEmailError();
  });

  test("should not allow registration with invalid email address", async () => {
    const user = generateUser();
    user.email = "invalid-email";

    await registerPage.register(user);

    await registerPage.expectInvalidEmailValidation();
  });

  test("should display validation for weak password", async () => {
    const user = generateUser();
    user.password = "password";

    await registerPage.register(user);

    await registerPage.expectWeakPasswordValidation();
  });

  test("should display validation when required fields are empty", async () => {
    await registerPage.openRegistrationForm();

    await registerPage.submit();

    const requiredFields = [
      registerPage.firstNameField,
      registerPage.lastNameField,
      registerPage.emailField,
      registerPage.passwordField,
    ];

    for (const field of requiredFields) {
      await registerPage.expectRequiredFieldValidation(field);
    }
  });

  test("should require accepting Terms & Conditions", async () => {
    const user = generateUser();
    await registerPage.register(user, {
      acceptTerms: false,
    });

    await registerPage.expectTermsRequired();
  });

  test("should show validation when password is less than 8 characters", async () => {
    const user = generateUser();
    user.password = "Pass1";

    await registerPage.register(user);

    await registerPage.expectPasswordLengthValidation();
  });
});
