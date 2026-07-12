import { test } from "@playwright/test";
import { RegisterPage } from "../tests/pages/RegisterPage";
import { LoginPage } from "../tests/pages/LoginPage";
import { generateUser } from "../tests/utils/faker";
import { registerAndOpenLogin } from "../tests/utils/authHelper";
import { HomePage } from "@pages/HomePage";

test.describe("User Login", () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.open();
  });

  test("should login successfully with newly registered user and logout", async () => {
    const user = generateUser();

    await registerAndOpenLogin(registerPage, homePage, user);

    // Login
    await loginPage.login(user.email, user.password);

    // Verify successful login
    await loginPage.expectSuccessfulLogin(user.firstName);
  });

  test("should show validation when email and password are empty", async () => {
    await homePage.openLoginPage();

    //Add empty username and password
    await loginPage.login("", "");

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getEmailField());
    await loginPage.expectRequiredFieldValidation(loginPage.getPasswordField());
  });

  test("should not login with incorrect password", async () => {
    const user = generateUser();

    await homePage.openLoginPage();

    // Incorrect Password Login
    const wrongPassword = "Jagdamba@123";
    await loginPage.login(user.email, wrongPassword);

    // Verify authentication error
    await loginPage.expectAuthenticationError();
  });

  test("should not login with unregistered email", async () => {
    const user = generateUser();

    await homePage.openLoginPage();

    await loginPage.login(user.email, user.password);

    await loginPage.expectAuthenticationError();
  });

  test("should show validation when email is empty", async () => {
    const user = generateUser();

    await homePage.openLoginPage();

    //Add empty email and valid password
    await loginPage.login("", user.password);

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getEmailField());
  });

  test("should show validation when password is empty", async () => {
    const user = generateUser();

    await homePage.openLoginPage();

    //Add empty email
    await loginPage.login(user.email, "");

    //Add validation for required fields
    await loginPage.expectRequiredFieldValidation(loginPage.getPasswordField());
  });
  test("should show validation for invalid email format", async () => {
    await homePage.openLoginPage();

    //Added invalid email and valid password
    await loginPage.login("invalid-email", "Password@123");

    // Added validation for invalid email format
    await loginPage.expectInvalidEmailValidation(loginPage.getEmailField());
  });

  test("should login again after logout multiple time", async () => {
    const user = generateUser();

    await registerAndOpenLogin(registerPage, homePage, user);

    await loginPage.login(user.email, user.password);
    await loginPage.expectSuccessfulLogin(user.firstName);

    await registerPage.logout();
    await homePage.openLoginPage();

    await loginPage.login(user.email, user.password);
    await loginPage.expectSuccessfulLogin(user.firstName);
  });
});
