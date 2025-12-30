import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemsContainer: Locator;
  readonly cartItem: Locator;
  readonly emptyCartContainer: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemsContainer = page.getByTestId('cart-items-container');
    this.cartItem = page.getByTestId('cart-item');
    this.emptyCartContainer = page.getByTestId('empty-cart-container');
    this.checkoutButton = page.getByTestId('checkout-button');
  }

  async shouldDisplayCart() {
    await this.page.getByTestId('top-controller-container').waitFor({ state: 'visible' });
  }

  async shouldContainProducts(expectedText: string) {
    await this.cartItemsContainer.waitFor({ state: 'visible' });
  }

  async shouldDisplayCartItem(productName: string) {
    await this.cartItem.waitFor({ state: 'visible' });
  }

  async removeFirstProduct() {
    await this.page.getByTestId('remove-from-cart-button').first().click();
  }

  async shouldBeEmpty() {
    await this.emptyCartContainer.waitFor({ state: 'visible' });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

