import { expect, Locator, Page, FrameLocator } from "@playwright/test";
export class LoginPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  async expectRequiredFieldValidation(field: Locator) {
    await expect(field).toHaveJSProperty(
      "validationMessage",
      "Please fill out this field.",
    );
  }

  private readonly frame: FrameLocator;

  private async expectValidationMessage(
    locator: Locator,
    expectedMessage: string,
  ) {
    const isValid = await locator.evaluate((element: HTMLInputElement) =>
      element.checkValidity(),
    );

    expect(isValid).toBe(false);

    const message = await this.getBrowserValidationMessage(locator);

    expect(message).toContain(expectedMessage);
  }

  async getBrowserValidationMessage(locator: Locator) {
    return locator.evaluate(
      (element: HTMLInputElement) => element.validationMessage,
    );
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

  getEmailField() {
    return this.emailField;
  }

  getPasswordField() {
    return this.passwordField;
  }

  async expectInvalidEmailValidation(field: Locator) {
    await expect(field).toHaveJSProperty(
      "validationMessage",
      "Please include an '@' in the email address. 'invalid-email' is missing an '@'.",
    );
  }

  private get passwordField() {
    return this.frame.locator("#field-password");
  }

  private get signInButton() {
    return this.frame.locator("#submit-login");
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  readonly authenticationError = this.page.getByRole("alert");

  async expectAuthenticationError() {
    await expect(this.frame.getByRole("alert")).toContainText(
      "Authentication failed.",
    );
  }

  async expectSuccessfulLogin(firstName: string) {
    await expect(this.frame.getByText(firstName)).toBeVisible();
    await expect(this.signInLink).not.toBeVisible();
  }
}
