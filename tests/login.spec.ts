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

  test("should login successfully with newly registered user", async ({
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
});
