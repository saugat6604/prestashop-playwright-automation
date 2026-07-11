import { test, expect } from "@playwright/test";
import { SearchPage } from "../tests/pages/SearchPage";
import { ProductPage } from "@pages/ProductPage";
import { HomePage } from "@pages/HomePage";

test.describe("Product Search", () => {
  let searchPage: SearchPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    homePage = new HomePage(page);
    await page.goto("https://demo.prestashop.com/#/en/front");
  });

  test("should search for an existing product", async ({ page }) => {
    const product = "t-shirt";
    await searchPage.searchProduct(product);
    await expect(searchPage.getSearchResultsHeading(product)).toBeVisible();
    await searchPage.expectFirstSearchResult(product);
    await expect(searchPage.searchInput).toHaveValue(product);
  });

  test("should show no results for a non-existing product", async ({
    page,
  }) => {
    const product = "RandomProduct12345";

    await homePage.searchProduct(product);
    await expect(searchPage.noSearchResultsHeading).toBeVisible();
  });
});
