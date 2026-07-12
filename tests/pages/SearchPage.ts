import { expect, Page, FrameLocator, Locator } from "@playwright/test";

export class SearchPage {
  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[name="framelive"]');
  }
  private readonly frame: FrameLocator;

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

  get productImage(): Locator {
    return this.frame.locator("img.product-miniature__image").first();
  }

  get searchInput(): Locator {
    return this.frame.getByPlaceholder("Search products...");
  }
  async searchProduct(product: string) {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.searchInput.press("Enter");
  }

  get productTitles() {
    return this.frame.locator(".product-miniature__title");
  }

  getSearchResultsHeading(product: string): Locator {
    return this.frame.getByRole("heading", {
      name: new RegExp(`Search results for "${product}"`, "i"),
    });
  }
  async expectFirstSearchResult(productName: string) {
    await expect(this.productTitles.first()).toContainText(
      new RegExp(productName, "i"),
    );
  }

  getNoSearchResultsHeading(searchTerm: string) {
    return this.page.getByRole("heading", {
      name: `No search results for "${searchTerm}"`,
    });
  }

  get noSearchResultsHeading() {
    return this.page
      .locator('iframe[name="framelive"]')
      .contentFrame()
      .getByRole("heading", { name: /No search results/i });
  }
}
