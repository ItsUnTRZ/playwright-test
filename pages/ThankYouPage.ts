import { Page, Locator } from '@playwright/test';

export class ThankYouPage {
  readonly page: Page;
  readonly thankYouContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.thankYouContainer = page.getByTestId('thank-you-container');
  }

  async shouldShowOrderComplete() {
    await this.thankYouContainer.waitFor({ state: 'visible' });
  }
}

