import { expect, Page, Frame, FrameLocator } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }
  private readonly frame: FrameLocator;

  private readonly orderSummary = this.page.locator("#js-checkout-summary");
  private readonly continueButton = this.page.locator(
    'button[name="confirm-addresses"]',
  );

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

  async expectOrderSummary() {
    await expect(this.orderSummary).toBeVisible();
  }

  async continueAddress() {
    await this.continueButton.click();
  }
}
