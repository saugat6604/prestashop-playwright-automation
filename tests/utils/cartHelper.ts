import { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

export async function addProductToCart(
  homePage: HomePage,
  searchPage: SearchPage,
  productPage: ProductPage,
  cartPage: CartPage,
  product: string,
) {
  await searchPage.searchProduct(product);

  await expect(searchPage.getSearchResultsHeading(product)).toBeVisible();
  await expect(searchPage.getProduct(product)).toBeVisible();

  await homePage.getProduct(product).click();

  await productPage.expectProductDetails(product);

  await expect(productPage.addToCartButton).toBeEnabled();

  await productPage.addToCartButton.click();

  await productPage.expectProductAdded();
  await productPage.expectCartProduct(product);
  await productPage.expectCartQuantity(1);

  await cartPage.proceedToCheckout();
}
