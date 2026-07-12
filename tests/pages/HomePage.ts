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

  get productPrice(): Locator {
    return this.frame.locator(".product-miniature__price").first();
  }
  private readonly frame: FrameLocator;

  getSearchResultsHeading(product: string): Locator {
    return this.frame.getByRole("heading", {
      name: new RegExp(`Search results for "${product}"`, "i"),
    });
  }

  get searchInput(): Locator {
    return this.frame.getByPlaceholder("Search products...");
  }
  private readonly searchButton = this.page.locator('button[type="submit"]');
  private readonly productItems = this.page.locator(".product-miniature");
  private readonly productName = this.page.locator(".product-title");

  async searchProduct(product: string) {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.searchInput.press("Enter");
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

  async openFirstProduct() {
    await this.productItems.first().click();
  }

  async expectSearchResult(product: string) {
    await expect(this.productName.first()).toContainText(product);
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
