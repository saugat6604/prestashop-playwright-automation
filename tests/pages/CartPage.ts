import { expect, Page, Locator, FrameLocator } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  private readonly frame: FrameLocator;

  get emptyCartMessage() {
    return this.page.getByText("There are no more items in your cart");
  }
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

  async expectCartQuantity(quantity: number) {
    await expect(this.getCartSummary(quantity)).toBeVisible();
  }

  async updateCartQuantity(quantity: number): Promise<void> {
    await this.cartQuantityInput.click();
    await this.cartQuantityInput.fill(quantity.toString());
    await this.cartQuantityInput.press("Enter");
  }

  private readonly removeButton = this.page.locator(".remove-from-cart");

  private readonly total = this.page.locator(".cart-total .value");

  get checkoutButton(): Locator {
    return this.frame
      .getByRole("link", {
        name: "Proceed to checkout",
      })
      .last();
  }

  getRemoveProductButton(product: string) {
    return this.page
      .locator('iframe[name="framelive"]')
      .contentFrame()
      .getByRole("link", {
        name: `Remove ${product}`,
      });
  }

  async removeProductFromCart(product: string) {
    await this.getRemoveProductButton(product).click();
  }

  async expectCartTotal() {
    await expect(this.total).toBeVisible();
  }

  private get shoppingCartTitle() {
    return this.frame.getByRole("heading", {
      name: "Shopping Cart",
    });
  }

  async expectShoppingCartPageVisible() {
    await expect(this.shoppingCartTitle).toBeVisible({ timeout: 15000 });
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible({ timeout: 15000 });
    await this.checkoutButton.click({
      force: true,
    });
  }
  getCartSummary(quantity: number): Locator {
    return this.frame.getByRole("link", {
      name: `View cart (${quantity} products)`,
    });
  }

  getProductInCart(product: string) {
    return this.page
      .locator('iframe[name="framelive"]')
      .contentFrame()
      .getByLabel("Products in cart")
      .getByText(product, { exact: true });
  }

  async expectProductInCart(product: string) {
    await expect(this.getProductInCart(product)).toBeVisible();
  }

  getRemoveSuccessMessage(product: string) {
    return this.page
      .locator('iframe[name="framelive"]')
      .contentFrame()
      .locator("div")
      .filter({
        hasText: new RegExp(`^${product} has been removed from the cart\\.$`),
      });
  }

  async expectRemoveSuccessMessage(product: string) {
    await expect(this.getRemoveSuccessMessage(product)).toBeVisible();
  }
}
