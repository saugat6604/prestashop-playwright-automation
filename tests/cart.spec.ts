import { test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { SearchPage } from "./pages/SearchPage";
import { addProductToCart } from "./utils/cartHelper";

test.describe("Cart", () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let searchPage: SearchPage;

  const product = "Hummingbird printed t-shirt";

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    searchPage = new SearchPage(page);

    await homePage.open();
    await addProductToCart(
      homePage,
      searchPage,
      productPage,
      cartPage,
      product,
    );
  });

  test("should add product to cart", async () => {
    await cartPage.expectProductInCart(product);
  });

  test("should remove product from cart", async () => {
    await cartPage.expectProductInCart(product);

    await cartPage.removeProductFromCart(product);

    await cartPage.expectRemoveSuccessMessage(product);
  });
});
