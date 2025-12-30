import { Page, Locator } from '@playwright/test';

export class ProductStorePage {
  readonly page: Page;
  readonly storeContainer: Locator;
  readonly cartItemsCount: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storeContainer = page.getByTestId('store-container');
    this.cartItemsCount = page.getByTestId('cart-items-count');
    this.nextPageButton = page.getByTestId('top-controller-container').getByTestId('next-page-button');
  }

  async shouldDisplayStore() {
    await this.storeContainer.waitFor({ state: 'visible' });
  }

  async shouldDisplayProduct(productName: string) {
    await this.storeContainer.waitFor({ state: 'visible' });
  }

  async goToNextPage() {
    await this.nextPageButton.click();
  }

  async shouldBeOnPage(pageNumber: number) {
    await this.page.locator('div').filter({ hasText: `Page ${pageNumber} of` }).nth(1).waitFor({ state: 'visible' });
  }

  async selectFirstProduct() {
    await this.page.getByTestId('add-to-cart-button').first().click();
  }

  async selectProduct(index: number) {
    await this.page.getByTestId('add-to-cart-button').nth(index).click();
  }

  async selectMultipleProducts(count: number) {
    for (let i = 0; i < count; i++) {
      await this.page.getByTestId('add-to-cart-button').nth(i).click();
    }
  }

  async shouldHaveCartItemsCount(expectedCount: string) {
    await this.cartItemsCount.waitFor({ state: 'visible' });
  }

  async viewCart() {
    await this.page.getByTestId('cart').click();
  }
}

