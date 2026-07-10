import { expect, Page, Locator, FrameLocator } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  private readonly frame: FrameLocator;

  get cartQuantityInput(): Locator {
    return this.frame
      .getByRole("list", { name: "Products in cart" })
      .getByLabel("Change quantity of");
  }

  get cartIncreaseQuantityButton(): Locator {
    return this.frame
      .getByRole("list", { name: "Products in cart" })
      .getByLabel("Increase quantity of");
  }

  async updateCartQuantity(quantity: number): Promise<void> {
    await this.cartQuantityInput.click();
    await this.cartQuantityInput.fill(quantity.toString());
    await this.cartQuantityInput.press("Enter");
  }

  private readonly removeButton = this.page.locator(".remove-from-cart");

  private readonly total = this.page.locator(".cart-total .value");

  get checkoutButton(): Locator {
    return this.frame.getByRole("link", {
      name: /^Proceed to checkout$/,
    });
  }

  async removeProduct() {
    await this.removeButton.click();
  }

  async expectCartTotal() {
    await expect(this.total).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
  getCartSummary(quantity: number): Locator {
    return this.frame.getByRole("link", {
      name: `View cart (${quantity} products)`,
    });
  }
}
