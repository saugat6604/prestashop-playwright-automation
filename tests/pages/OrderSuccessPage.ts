import { expect, FrameLocator, Page } from "@playwright/test";

export class OrderSuccessPage {
  constructor(private page: Page) {}

  private get frame(): FrameLocator {
    return this.page.frameLocator('iframe[name="framelive"]');
  }

  private get orderConfirmedHeading() {
    return this.frame.getByRole("heading", {
      name: "Your order is confirmed",
    });
  }

  private get confirmationEmailMessage() {
    return this.frame.getByText("An email has been sent to the");
  }

  private get orderReferenceMessage() {
    return this.frame.getByText("Your order on PrestaShop is");
  }

  private get paymentMethod() {
    return this.frame.getByText("Pay by Cash on Delivery");
  }

  private get orderDetailsHeading() {
    return this.frame.getByRole("heading", {
      name: "Order details",
    });
  }

  private get orderedProduct() {
    return this.frame.locator(".order-confirmation__product-title");
  }

  private get totalLabel() {
    return this.frame.getByText("Total (tax incl.)");
  }

  private get totalAmount() {
    return this.frame
      .getByText("Total (tax incl.)")
      .locator(
        "xpath=following-sibling::div[contains(@class,'order-confirmation__line-value')]",
      );
  }
  async expectOrderConfirmation(productName: string) {
    await expect(this.orderConfirmedHeading).toBeVisible({ timeout: 15000 });
    await expect(this.confirmationEmailMessage).toBeVisible();
    await expect(this.orderReferenceMessage).toBeVisible();
    await expect(this.paymentMethod).toBeVisible();

    await expect(this.orderDetailsHeading).toBeVisible();
    await expect(this.orderedProduct).toContainText(productName);

    await expect(this.totalLabel).toBeVisible();
    await expect(this.totalAmount).toContainText("€");
  }
}
