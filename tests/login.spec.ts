import { test } from "@playwright/test";
import { RegisterPage } from "../tests/pages/RegisterPage";
import { LoginPage } from "../tests/pages/LoginPage";
import { generateUser } from "../tests/utils/faker";

test.describe("User Login", () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);

    await registerPage.open();
  });

  test("should login successfully with newly registered user and logout", async ({
    page,
  }) => {
    const user = generateUser();

    // Register user
    await registerPage.register(user);
    await registerPage.expectSuccessfulRegistration(user.firstName);

    // Logout
    await registerPage.logout();

    //Click Signin
    await registerPage.openLoginPage();

    // Login
    await loginPage.login(user.email, user.password);

    // Verify successful login
    await loginPage.expectSuccessfulLogin(user.firstName);
  });

  test("should show validation when email and password are empty", async () => {
    await registerPage.openLoginPage();

    //Add empty username and password
    await loginPage.login("", "");

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getEmailField());
    await loginPage.expectRequiredFieldValidation(loginPage.getPasswordField());
  });

  test("should not login with incorrect password", async ({ page }) => {
    const user = generateUser();

    // Register user
    await registerPage.register(user);
    await registerPage.expectSuccessfulRegistration(user.firstName);

    // Logout
    await registerPage.logout();

    //Click Signin
    await registerPage.openLoginPage();

    // Incorrect Password Login
    user.password = "Jagdamba@123";
    await loginPage.login(user.email, user.password);

    // Verify authentication error
    await loginPage.expectAuthenticationError();
  });

  test("should not login with unregistered email", async () => {
    const user = generateUser();

    await registerPage.openLoginPage();

    await loginPage.login(user.email, user.password);

    await loginPage.expectAuthenticationError();
  });

  test("should show validation when email is empty", async () => {
    const user = generateUser();

    await registerPage.openLoginPage();

    //Add empty email and valid password
    await loginPage.login("", user.password);

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getEmailField());
  });

  test.only("should show validation when password is empty", async () => {
    const user = generateUser();

    await registerPage.openLoginPage();

    //Add empty email
    await loginPage.login(user.email, "");

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getPasswordField());
  });
});
