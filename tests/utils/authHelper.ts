import { RegisterPage } from "../pages/RegisterPage";
import { UserData } from "./faker";

export async function registerAndOpenLogin(
  registerPage: RegisterPage,
  user: UserData,
) {
  await registerPage.register(user);
  await registerPage.expectSuccessfulRegistration(user.firstName);

  await registerPage.logout();
  await registerPage.openLoginPage();
}
