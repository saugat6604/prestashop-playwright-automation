import { test, expect } from "@playwright/test";

import { RegisterPage } from "../tests/pages/RegisterPage";
import { LoginPage } from "../tests/pages/LoginPage";
import { HomePage } from "../tests/pages/HomePage";
import { ProductPage } from "../tests/pages/ProductPage";
import { CartPage } from "../tests/pages/CartPage";
import { CheckoutPage } from "../tests/pages/CheckoutPage";

import { generateUser } from "../tests/utils/faker";

test.describe("Purchase Flow", () => {
  test.setTimeout(60000);

  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await registerPage.open();
  });

  test("should purchase a product successfully", async ({ page }) => {
    // const user = generateUser();

    // // Register user
    // await registerPage.register(user);
    // await registerPage.expectSuccessfulRegistration(user.firstName);

    // // Logout
    // await registerPage.logout();

    // // Login
    // await registerPage.openLoginPage();
    // await loginPage.login(user.email, user.password);
    // await loginPage.expectSuccessfulLogin(user.firstName);

    // Search product

    await homePage.searchProduct("t-shirt");
    await expect(homePage.getSearchResultsHeading("t-shirt")).toBeVisible();
    await expect(
      homePage.getProduct("Hummingbird printed t-shirt"),
    ).toBeVisible();

    //Verify search text is stored
    await expect(homePage.searchInput).toHaveValue("t-shirt");

    //Verify price is shown
    await expect(homePage.productPrice).toBeVisible();

    //Verify Product image is visible
    await expect(homePage.productImage).toBeVisible();

    // Open product
    await homePage.getProduct("Hummingbird printed t-shirt").click();

    // // Verify product details

    await productPage.expectProductDetails("Hummingbird printed t-shirt");

    // Verify Add to cart button is enabled
    await productPage.addToCartButton.isEnabled();

    // // Add to cart

    await page.waitForTimeout(5000);
    await productPage.addToCartButton.click();
    await productPage.expectProductAdded();

    // // Verify cart modal
    await productPage.expectCartProduct("Hummingbird printed t-shirt");
    await productPage.expectCartQuantity(1);

    // Proceed to cart
    await productPage.proceedToCheckout();

    // Update quantity
    await cartPage.updateCartQuantity(11);

    await expect(cartPage.getCartSummary(11)).toBeVisible();

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await page.pause(); // Wait for the cart to update

    // // Fill address (if required)
    // await checkoutPage.fillAddress({
    //   alias: "Home",
    //   address: "Kathmandu",
    //   zipCode: "44444",
    //   city: "Kathmandu",
    // });

    // // Shipping
    // await checkoutPage.continueToShipping();

    // // Payment
    // await checkoutPage.continueToPayment();
    // await checkoutPage.selectCashOnDelivery();
    // await checkoutPage.acceptTerms();

    // // Place order
    // await checkoutPage.placeOrder();

    // // Verify order confirmation
    // await checkoutPage.expectOrderConfirmed();
    // await checkoutPage.expectPaymentInformation();
  });
});
