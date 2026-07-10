import { expect, Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private readonly orderSummary = this.page.locator("#js-checkout-summary");
  private readonly continueButton = this.page.locator(
    'button[name="confirm-addresses"]',
  );

  async expectOrderSummary() {
    await expect(this.orderSummary).toBeVisible();
  }

  async continueAddress() {
    await this.continueButton.click();
  }
}
