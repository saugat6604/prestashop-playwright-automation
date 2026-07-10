import { expect, Locator, Page, FrameLocator } from "@playwright/test";
export class LoginPage {
  private readonly frame: FrameLocator;

  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  private get signInLink() {
    return this.frame.getByLabel("Sign in");
  }

  async openLoginPage(): Promise<void> {
    await this.signInLink.click();
  }

  private get emailField() {
    return this.frame.locator("#field-email");
  }

  private get passwordField() {
    return this.frame.locator("#field-password");
  }

  private get signInButton() {
    return this.frame.locator("#submit-login");
  }

  async login(email: string, password: string) {
    console.log(email, password);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async expectSuccessfulLogin(firstName: string) {
    await expect(this.frame.getByText(firstName)).toBeVisible();
    await expect(this.signInLink).not.toBeVisible();
  }
}
