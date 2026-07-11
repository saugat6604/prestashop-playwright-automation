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
