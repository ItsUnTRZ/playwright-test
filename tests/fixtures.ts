import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductStorePage } from '../pages/ProductStorePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ThankYouPage } from '../pages/ThankYouPage';
import { EmailPage } from '../pages/EmailPage';

type PageObjects = {
  loginPage: LoginPage;
  productStorePage: ProductStorePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  thankYouPage: ThankYouPage;
  emailPage: EmailPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productStorePage: async ({ page }, use) => {
    await use(new ProductStorePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },
  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },
});

export { expect } from '@playwright/test';

