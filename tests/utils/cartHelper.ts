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
  await homePage.searchProduct(product);

  await expect(searchPage.getSearchResultsHeading(product)).toBeVisible();
  await expect(searchPage.getProduct(product)).toBeVisible();

  await searchPage.openProduct(product);

  await productPage.expectProductDetails(product);

  await productPage.addToCart();

  await productPage.expectProductAdded();
  await productPage.expectCartProduct(product);
  await productPage.expectCartQuantity(1);

  await cartPage.proceedToCheckout();
}
