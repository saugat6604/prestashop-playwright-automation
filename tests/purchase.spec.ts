import { test } from "@playwright/test";
import { RegisterPage } from "../tests/pages/RegisterPage";
import { HomePage } from "../tests/pages/HomePage";
import { ProductPage } from "../tests/pages/ProductPage";
import { CartPage } from "../tests/pages/CartPage";
import { CheckoutPage } from "../tests/pages/CheckoutPage";
import { OrderSuccessPage } from "../tests/pages/OrderSuccessPage";
import { SearchPage } from "../tests/pages/SearchPage";
import { addProductToCart } from "./utils/cartHelper";
import { generateUser } from "../tests/utils/faker";

test.describe("Purchase Flow", () => {
  let registerPage: RegisterPage;
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let orderSuccessPage: OrderSuccessPage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    orderSuccessPage = new OrderSuccessPage(page);
    searchPage = new SearchPage(page);

    await homePage.open();
  });

  test("from product search to order placement", async () => {
    // Add product to cart
    const product = "Hummingbird printed t-shirt";

    await addProductToCart(
      homePage,
      searchPage,
      productPage,
      cartPage,
      product,
    );

    // Update quantity
    await cartPage.updateCartQuantity(11);

    await cartPage.expectCartQuantity(11);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill personal information and continue to address
    const user = generateUser();
    await checkoutPage.expectPersonalInformationPageVisible();
    await checkoutPage.fillPersonalInformation(user, true, true);

    // Fill address
    await checkoutPage.expectAddressesPageVisible();
    await checkoutPage.fillAddress(user);

    // Shipping
    await checkoutPage.expectShippingMethodPageVisible();
    await checkoutPage.continueToPayment();

    // Payment
    await checkoutPage.expectPaymentPageVisible();
    await checkoutPage.selectCashOnDelivery();
    await checkoutPage.expectCashOnDeliveryMessageVisible();
    await checkoutPage.acceptTerms();

    // Place order
    await checkoutPage.placeOrder();

    // Verify order confirmation
    await orderSuccessPage.expectOrderConfirmation(product);
  });
});
