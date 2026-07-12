import { expect, Locator, Page, FrameLocator } from "@playwright/test";

export class HomePage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }

  getProduct(productName: string): Locator {
    return this.frame
      .locator("a.product-miniature__title", {
        hasText: productName,
      })
      .first();
  }

  get searchInput(): Locator {
    return this.frame.getByPlaceholder("Search products...");
  }
  async searchProduct(product: string) {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.searchInput.press("Enter");
  }

  get productPrice(): Locator {
    return this.frame.locator(".product-miniature__price").first();
  }
  private readonly frame: FrameLocator;

  getSearchResultsHeading(product: string): Locator {
    return this.frame.getByRole("heading", {
      name: new RegExp(`Search results for "${product}"`, "i"),
    });
  }

  async openProduct(productName: string) {
    await this.frame
      .locator("a.product-miniature__title")
      .filter({
        hasText: productName,
      })
      .first()
      .click();
  }

  get productImage(): Locator {
    return this.frame.locator("img.product-miniature__image").first();
  }

  async open() {
    await this.page.goto("/#/en/front");
  }

  get signInLink() {
    return this.frame.getByLabel("Sign in");
  }

  async openLoginPage(): Promise<void> {
    await this.signInLink.click();
  }
}
