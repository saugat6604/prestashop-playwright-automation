import { test, expect } from "@playwright/test";
import { SearchPage } from "../tests/pages/SearchPage";
import { HomePage } from "../tests/pages/HomePage";

test.describe("Product Search", () => {
  let searchPage: SearchPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.open();
  });

  test("should search for an existing product", async ({ page }) => {
    const product = "t-shirt";
    await homePage.searchProduct(product);
    await expect(searchPage.getSearchResultsHeading(product)).toBeVisible();
    await searchPage.expectFirstSearchResult(product);
    await expect(homePage.searchInput).toHaveValue(product);

    // Verify price is shown
    await expect(searchPage.productPrice).toBeVisible();

    // Verify Product image is visible
    await expect(searchPage.productImage).toBeVisible();
  });

  test("should show no results for a non-existing product", async ({
    page,
  }) => {
    const product = "RandomProduct12345";

    await homePage.searchProduct(product);
    await expect(searchPage.noSearchResultsHeading).toBeVisible();
  });
});
