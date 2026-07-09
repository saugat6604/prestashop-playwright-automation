import { test, expect } from "@playwright/test";
import { RegisterPage } from "../tests/pages/RegisterPage";
import { generateUser, UserData } from "../tests/utils/faker";

test.describe("User Registration", () => {
  test.describe.configure({
    mode: "parallel",
  });
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);

    await registerPage.open();
  });

  function createUser(): UserData {
    return generateUser();
  }

  test("should register a new customer successfully and logout", async () => {
    const user = createUser();

    await registerPage.register(user);

    await registerPage.expectSuccessfulRegistration(user.firstName);

    await registerPage.logout();
  });

  test("should not allow registration with an already registered email", async () => {
    const user = createUser();

    // Register first user
    await registerPage.register(user);

    await registerPage.logout();

    // Try registering same user again
    await registerPage.register(user);

    await registerPage.expectDuplicateEmailError();
  });

  test("should not allow registration with invalid email address", async () => {
    const user = createUser();

    user.email = "invalid-email";

    await registerPage.register(user);

    const validationMessage = await registerPage.getBrowserValidationMessage(
      registerPage.emailField,
    );

    expect(validationMessage).toContain("Please include an '@'");
  });

  test("should display validation for weak password", async () => {
    const user = createUser();

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
    const user = createUser();

    await registerPage.register(user, {
      acceptTerms: false,
    });

    await registerPage.expectTermsRequired();
  });

  test("should show validation when password is less than 8 characters", async () => {
    const user = createUser();

    user.password = "Pass1";

    await registerPage.register(user);

    const validationMessage = await registerPage.getBrowserValidationMessage(
      registerPage.passwordField,
    );

    expect(validationMessage).toMatch(
      /Please lengthen this text|password length is invalid/i,
    );
  });
});
