import { expect, Page, Frame, FrameLocator } from "@playwright/test";
import { UserData } from "../utils/faker";

export class CheckoutPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }
  private readonly frame: FrameLocator;

  private readonly orderSummary = this.page.locator("#js-checkout-summary");
  get continueButton() {
    return this.frame.getByRole("button", { name: "Continue" });
  }

  private get shippingMethodTitle() {
    return this.frame.getByRole("heading", {
      name: "Shipping Method",
    });
  }

  async expectShippingMethodPageVisible() {
    await expect(this.shippingMethodTitle).toBeVisible({ timeout: 15000 });
  }

  private get paymentTitle() {
    return this.frame.getByRole("heading", {
      name: "Payment",
    });
  }

  private get personalInformationTitle() {
    return this.frame.getByRole("heading", {
      name: "Personal Information",
    });
  }

  private get addressesTitle() {
    return this.frame.getByRole("heading", {
      name: "Addresses",
    });
  }
  async expectAddressesPageVisible() {
    await expect(this.addressesTitle).toBeVisible({ timeout: 15000 });
  }

  async expectPersonalInformationPageVisible() {
    await expect(this.personalInformationTitle).toBeVisible({ timeout: 15000 });
  }

  async expectPaymentPageVisible() {
    await expect(this.paymentTitle).toBeVisible({ timeout: 15000 });
  }
  placeOrder() {
    this.expectPaymentPageVisible();
    expect(this.placeOrderButton).toBeEnabled();
    this.placeOrderButton.click();
  }
  acceptTerms() {
    this.termsAndConditionsCheckbox.check();
  }
  selectCashOnDelivery() {
    this.cashOnDeliveryRadio.click();
  }

  get cashOnDeliveryMessage() {
    return this.frame.getByText("You pay for the merchandise upon delivery");
  }

  async expectCashOnDeliveryMessageVisible() {
    await expect(this.cashOnDeliveryMessage).toBeVisible();
  }

  private get cashOnDeliveryRadio() {
    return this.frame.getByRole("radio", {
      name: "Pay by Cash on Delivery",
    });
  }

  private get termsAndConditionsCheckbox() {
    return this.frame.getByRole("checkbox", {
      name: "I agree to the terms of",
    });
  }

  private get placeOrderButton() {
    return this.frame.getByRole("button", {
      name: "Place Order",
    });
  }

  get continueToPaymentButton() {
    return this.frame.getByRole("button", {
      name: "Continue to Payment",
    });
  }

  async continueToPayment() {
    await this.continueToPaymentButton.click();
  }

  async expectOrderSummary() {
    await expect(this.orderSummary).toBeVisible();
  }

  async continueAddress() {
    await this.continueButton.click();
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

  private get emailInput() {
    return this.frame.getByRole("textbox", {
      name: "Email",
      exact: true,
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

  async fillAddress(user: UserData): Promise<void> {
    await this.addressInput.fill(user.address);

    await this.zipCodeInput.fill(user.zipCode);

    await this.cityInput.fill(user.city);

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
}
