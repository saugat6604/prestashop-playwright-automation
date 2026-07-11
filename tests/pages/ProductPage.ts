import { expect, Page, FrameLocator, Locator } from "@playwright/test";

export class ProductPage {
  async expectCartQuantity(quantity: number): Promise<void> {
    await expect(this.frame.getByText(`Quantity: ${quantity}`)).toBeVisible();
  }
  expectCartProduct(productName: string): Locator {
    return this.frame.locator(".blockcart-modal__name", {
      hasText: productName,
    });
  }

  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }
  private readonly frame: FrameLocator;

  getProductName(productName: string): Locator {
    return this.frame.getByRole("heading", {
      name: productName,
    });
  }
  get productPrice(): Locator {
    return this.frame.locator("div.product__price");
  }

  private get cartModal(): Locator {
    return this.frame.locator("#blockcart-modal-title");
  }
  get addToCartSuccessMessage(): Locator {
    return this.frame.getByText(" Added to your cart");
  }
  get proceedToCheckoutButton(): Locator {
    return this.frame
      .getByRole("link", { name: "Proceed to checkout" })
      .first();
  }

  async expectProductDetails(name: string) {
    await expect(this.getProductName(name)).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    //await expect(this.productImage).toBeVisible({ timeout: 15000 });
    //await expect(this.productImage).toBeEnabled({ timeout: 15000 });
  }

  get incrementQuantityButton(): Locator {
    return this.frame.getByRole("button", {
      name: "Increase quantity of",
    });
  }

  get quantitySpinner(): Locator {
    return this.frame.locator("#increment_button_1 .spinner-border");
  }

  get productThumbnailImage(): Locator {
    return this.frame.locator(".product__thumbnails img");
  }

  async expectProductThumbnailLoaded(): Promise<void> {
    await expect(this.productThumbnailImage).toBeVisible();
  }

  async waitForProductImageToLoad(): Promise<void> {
    await expect(this.productImage).toBeVisible();

    await expect(async () => {
      const isLoaded = await this.productImage.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      );

      expect(isLoaded).toBe(true);
    }).toPass();
  }

  get addToCartButton(): Locator {
    return this.frame.getByRole("button", {
      name: "Add to cart Hummingbird printed t-shirt",
    });
  }

  async increaseQuantityToTwo(): Promise<void> {
    if ((await this.quantityInput.inputValue()) !== "2") {
      await this.incrementQuantityButton.click();
      await expect(this.quantityInput).toHaveValue("2");
    }
  }

  get quantityInput(): Locator {
    return this.frame.locator("#quantity_wanted");
  }

  get productImage(): Locator {
    return this.frame
      .getByRole("img", {
        name: "Hummingbird printed t-shirt",
      })
      .first();
  }
  async waitForAllProductImagesToLoad() {
    await expect(this.productImage.first()).toBeVisible();

    await expect(async () => {
      const allLoaded = await this.productImage.evaluateAll((images) =>
        images.every((img) => {
          const image = img as HTMLImageElement;
          return image.complete && image.naturalWidth > 0;
        }),
      );

      expect(allLoaded).toBe(true);
    }).toPass({
      timeout: 10000,
    });
  }

  async expectProductAdded() {
    await expect(this.addToCartSuccessMessage).toBeVisible({ timeout: 15000 });
  }

  async proceedToCheckout() {
    await expect(this.proceedToCheckoutButton).toBeVisible({ timeout: 15000 });
    await this.proceedToCheckoutButton.click();
  }
}
