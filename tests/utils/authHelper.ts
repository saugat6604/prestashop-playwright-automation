import { RegisterPage } from "../pages/RegisterPage";
import { UserData } from "./faker";
import { HomePage } from "@pages/HomePage";

export async function registerAndOpenLogin(
  registerPage: RegisterPage,
  homePage: HomePage,
  user: UserData,
) {
  await registerPage.register(user);
  await registerPage.expectSuccessfulRegistration(user.firstName);

  await registerPage.logout();
  await homePage.openLoginPage();
}
