import { test, expect } from "@playwright/test";
import { SearchPage } from "../tests/pages/SearchPage";

test.describe("Product Search", () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto("https://demo.prestashop.com/#/en/front");
  });

  test("should search for an existing product", async ({ page }) => {
    const product = "t-shirt";
    await searchPage.searchProduct(product);
    await expect(searchPage.getSearchResultsHeading(product)).toBeVisible();
    await searchPage.expectFirstSearchResult(product);
    await expect(searchPage.searchInput).toHaveValue(product);

    // Verify price is shown
    await expect(searchPage.productPrice).toBeVisible();

    // Verify Product image is visible
    await expect(searchPage.productImage).toBeVisible();
  });

  test("should show no results for a non-existing product", async ({
    page,
  }) => {
    const product = "RandomProduct12345";

    await searchPage.searchProduct(product);
    await expect(searchPage.noSearchResultsHeading).toBeVisible();
  });
});
