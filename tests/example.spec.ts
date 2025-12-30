import { test, expect } from './fixtures';

test('user can login successfully', async ({ loginPage, page }) => {
  await test.step('Authenticate as customer1', async () => {
    await loginPage.authenticateAsCustomer1();
  });
  
  await test.step('User should be logged in and see products', async () => {
    await loginPage.shouldBeLoggedIn();
    await expect(page.getByTestId('top-controller-container')).toContainText('products');
  });
});

test('user can add product to cart', async ({ loginPage, productStorePage, page }) => {
  await test.step('Login and navigate to store', async () => {
    await loginPage.authenticateAsCustomer1();
    await productStorePage.shouldDisplayStore();
  });
  
  await test.step('Add product to cart', async () => {
    await productStorePage.selectFirstProduct();
  });
  
  await test.step('Product should be added to cart', async () => {
    await expect(page.getByTestId('cart-items-count')).toContainText('1');
  });
});

test('user can remove product from cart', async ({ loginPage, productStorePage, cartPage, page }) => {
  await test.step('Login, add product to cart, and view cart', async () => {
    await loginPage.authenticateAsCustomer1();
    await productStorePage.shouldDisplayStore();
    await productStorePage.selectFirstProduct();
    await productStorePage.viewCart();
  });
  
  await test.step('Remove product from cart', async () => {
    await cartPage.removeFirstProduct();
  });
  
  await test.step('Cart should be empty', async () => {
    await cartPage.shouldBeEmpty();
  });
});

test('user can add product to cart and checkout successfully and receive email confirmation', async ({ loginPage, productStorePage, cartPage, checkoutPage, thankYouPage, emailPage, page }) => {
  await test.step('Login, add product to cart, and prepare checkout', async () => {
    await loginPage.authenticateAsCustomer1();
    await productStorePage.shouldDisplayStore();
    await productStorePage.selectFirstProduct();
    await productStorePage.viewCart();
  });
  
  await test.step('Complete checkout process', async () => {
    await cartPage.checkout();
    await checkoutPage.provideShippingDetails({
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@mailinator.com',
      zipcode: '80000'
    });
    await checkoutPage.placeOrder();
  });
  
  await test.step('Order should be complete and email confirmation should be sent', async () => {
    await thankYouPage.shouldShowOrderComplete();
    await emailPage.goToMailpit();
    await emailPage.shouldOpenOrderConfirmationEmail('test@mailinator.com', 'Test Test');
    await emailPage.shouldDisplayOrderConfirmationContent('Test Test');
    await emailPage.shouldContainProductDetails('TerraFlex Hoodie', '79.69');
    await emailPage.shouldDisplayTotalAmount('79.69');
  });
});

test('user can add multiple products to cart and checkout successfully and receive email confirmation', async ({ loginPage, productStorePage, cartPage, checkoutPage, thankYouPage, emailPage, page }) => {
  await test.step('Login, navigate to page 2, and add multiple products to cart', async () => {
    await loginPage.authenticateAsCustomer1();
    await productStorePage.shouldDisplayStore();
    await productStorePage.shouldBeOnPage(1);
    await productStorePage.goToNextPage();
    await productStorePage.shouldBeOnPage(2);
    await productStorePage.shouldDisplayStore();
    await productStorePage.selectFirstProduct();
    await productStorePage.selectProduct(1);
    await productStorePage.viewCart();
  });
  
  await test.step('Complete checkout process', async () => {
    await cartPage.checkout();
    await checkoutPage.provideShippingDetails({
      firstName: 'test',
      lastName: 'test',
      email: 'test@mailinator.com',
      zipcode: '80000'
    });
    await checkoutPage.placeOrder();
  });
  
  await test.step('Order should be complete and email confirmation should contain all products and total amount', async () => {
    await thankYouPage.shouldShowOrderComplete();
    await emailPage.goToMailpit();
    await emailPage.shouldOpenOrderConfirmationEmail('test@mailinator.com', 'Test Test');
    await emailPage.shouldDisplayOrderConfirmationContent('Test Test');
    await emailPage.shouldContainProductDetails('Astra Casual Socks', '11.40');
    await emailPage.shouldContainProductDetails('RunLab Casual Gloves', '18.96');
    await emailPage.shouldDisplayTotalAmount('30.36');
  });
});
