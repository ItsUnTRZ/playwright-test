import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToMailpit() {
    await this.page.goto('https://mailpit.odds.team/');
  }

  async locateOrderConfirmationEmail(recipientEmail: string, customerName: string) {
    return this.page.getByRole('link').filter({ 
      hasText: new RegExp(`To: ${recipientEmail}.*Order #.*Confirmation.*Hi ${customerName}`)
    }).first();
  }

  async shouldOpenOrderConfirmationEmail(recipientEmail: string, customerName: string) {
    const emailLink = await this.locateOrderConfirmationEmail(recipientEmail, customerName);
    await emailLink.waitFor({ state: 'visible', timeout: 10000 });
    await emailLink.click();
  }

  async shouldDisplayOrderConfirmationContent(customerName: string) {
    await this.page.getByText(`Hi ${customerName}, Your order #`).waitFor({ state: 'visible' });
  }

  async shouldContainProductName(productName: string) {
    await this.page.getByText(productName, { exact: false }).waitFor({ state: 'visible' });
  }

  async shouldContainProductPrice(price: string) {
    await this.page.getByText(price, { exact: false }).waitFor({ state: 'visible' });
  }

  async shouldContainProductDetails(productName: string, price: string) {
    await this.shouldContainProductName(productName);
    await this.shouldContainProductPrice(price);
  }

  async shouldDisplayTotalAmount(totalAmount: string) {
    await this.page.getByText(totalAmount, { exact: false }).waitFor({ state: 'visible' });
  }
}

