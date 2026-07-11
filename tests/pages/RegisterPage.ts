import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { UserData } from "../utils/faker";

export class RegisterPage {
  private readonly frame: FrameLocator;
  get continueButton() {
    return this.frame.getByRole("button", { name: "Continue" });
  }
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  // -------------------------
  // Locators
  // -------------------------

  private get signInLink() {
    return this.frame.getByLabel("Sign in");
  }

  async openLoginPage(): Promise<void> {
    await this.signInLink.click();
  }

  private get createAccountLink() {
    return this.frame.getByRole("link", {
      name: "Create your account",
    });
  }

  private get mrRadio() {
    return this.frame.getByRole("radio", {
      name: "Mr.",
    });
  }

  private get firstNameInput() {
    return this.frame.getByRole("textbox", {
      name: "First name",
    });
  }

  private get lastNameInput() {
    return this.frame.getByRole("textbox", {
      name: "Last name",
    });
  }

  private static readonly URL = "https://demo.prestashop.com/#/en/front";

  async open() {
    await this.page.goto(RegisterPage.URL);
    await expect(this.page.locator('iframe[name="framelive"]')).toBeVisible();
  }

  private get emailInput() {
    return this.frame.getByRole("textbox", {
      name: "Email",
      exact: true,
    });
  }

  private get passwordInput() {
    return this.frame.getByRole("textbox", {
      name: "Password",
    });
  }

  private get birthDateInput() {
    return this.frame.getByRole("textbox", {
      name: "Birthdate",
    });
  }

  private get termsCheckbox() {
    return this.frame.getByRole("checkbox", {
      name: /terms/i,
    });
  }

  private get privacyCheckbox() {
    return this.frame.locator("#field-customer_privacy");
  }

  private get createAccountButton() {
    return this.frame.getByRole("button", {
      name: "Create account",
    });
  }

  private get myAccountButton() {
    return this.frame.getByRole("button", {
      name: /View my account/i,
    });
  }

  private get signOutButton() {
    return this.frame
      .getByRole("link", {
        name: "Sign out",
      })
      .first();
  }

  private get duplicateEmailAlert() {
    return this.frame.getByRole("alert");
  }

  private get passwordStrengthIndicator() {
    return this.frame
      .locator('[data-ps-ref="password-requirements-score-icon"]')
      .first();
  }

  // -------------------------
  // Public Fields
  // Used for validation tests
  // -------------------------

  get firstNameField() {
    return this.frame.locator("#field-firstname");
  }

  get lastNameField() {
    return this.frame.locator("#field-lastname");
  }

  get emailField() {
    return this.frame.locator("#field-email");
  }

  get passwordField() {
    return this.frame.locator("#field-password");
  }

  // -------------------------
  // Actions
  // -------------------------

  async openRegistrationForm() {
    await this.signInLink.click();

    await this.createAccountLink.click();

    await expect(this.createAccountTitle).toBeVisible();
  }
  private get createAccountTitle() {
    return this.frame.getByRole("heading", {
      name: "Create an account",
    });
  }

  async fillPersonalInformation(
    user: UserData,
    acceptTerms = true,
    checkPrivacy = true,
  ): Promise<void> {
    await this.mrRadio.check();

    await this.firstNameInput.fill(user.firstName);

    await this.lastNameInput.fill(user.lastName);

    await this.emailInput.fill(user.email);

    await this.birthDateInput.fill(user.birthDate);

    if (acceptTerms) {
      await this.termsCheckbox.check();
    }

    if (checkPrivacy && !(await this.privacyCheckbox.isChecked())) {
      await this.privacyCheckbox.check();
    }

    await this.continueButton.click();
  }

  get addressInput() {
    return this.frame.getByRole("textbox", {
      name: "Address",
      exact: true,
    });
  }

  get zipCodeInput() {
    return this.frame.getByRole("textbox", {
      name: "Zip/Postal Code",
    });
  }

  get cityInput() {
    return this.frame.getByRole("textbox", {
      name: "City",
    });
  }

  async fillAddress(user: UserData): Promise<void> {
    await this.addressInput.fill(user.address);

    await this.zipCodeInput.fill(user.zipCode);

    await this.cityInput.fill(user.city);

    await this.continueButton.click();
  }

  async fillRegistrationForm(
    user: UserData,
    options: {
      acceptTerms?: boolean;
      checkPrivacy?: boolean;
    } = {},
  ) {
    const { acceptTerms = true, checkPrivacy = true } = options;

    await this.mrRadio.click();

    await this.firstNameInput.fill(user.firstName);

    await this.lastNameInput.fill(user.lastName);

    await this.emailInput.fill(user.email);

    await this.passwordInput.fill(user.password);

    await this.birthDateInput.fill(user.birthDate);

    if (acceptTerms) {
      await this.termsCheckbox.check();
    }

    if (checkPrivacy && !(await this.privacyCheckbox.isChecked())) {
      await this.privacyCheckbox.check();
    }
  }

  async submit() {
    await this.createAccountButton.click();
  }

  private get passwordScoreMessage() {
    return this.frame.locator(
      '[data-ps-ref="password-requirements-score-message"]',
    );
  }

  async expectWeakPasswordValidation() {
    await expect(this.passwordScoreMessage).toHaveText(
      "The minimum score must be: Strong",
    );
  }

  async register(
    user: UserData,
    options: {
      acceptTerms?: boolean;
      checkPrivacy?: boolean;
    } = {},
  ) {
    await this.openRegistrationForm();

    await this.fillRegistrationForm(user, options);
    await this.submit();
  }

  async logout() {
    await this.myAccountButton.click();

    await expect(this.signOutButton).toBeVisible();

    await this.signOutButton.click();

    await expect(this.signInLink).toBeVisible();
  }

  // -------------------------
  // Assertions
  // -------------------------

  async expectSuccessfulRegistration(firstName: string) {
    await expect(this.frame.getByText(firstName)).toBeVisible();

    await expect(this.signInLink).not.toBeVisible();
  }

  async expectDuplicateEmailError() {
    await expect(this.duplicateEmailAlert).toContainText(
      "The email is already used, please choose another one or sign in",
    );
  }

  async expectWeakPassword() {
    await expect(this.passwordStrengthIndicator).toHaveClass(/text-danger/);
  }

  async expectRequiredFieldValidation(locator: Locator) {
    await this.expectValidationMessage(locator, "Please fill out this field");
  }

  async expectTermsRequired() {
    await this.expectValidationMessage(
      this.termsCheckbox,
      "Please check this box if you want to proceed.",
    );
  }

  async getBrowserValidationMessage(locator: Locator) {
    return locator.evaluate(
      (element: HTMLInputElement) => element.validationMessage,
    );
  }

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
}
