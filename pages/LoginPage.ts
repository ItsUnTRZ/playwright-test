import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.getByTestId('login-field');
    this.passwordField = page.getByTestId('password-field');
    this.submitButton = page.getByTestId('submit-button');
  }

  async goToStore() {
    await this.page.goto('https://merchandise-dev.odds.team/');
  }

  async authenticateAsCustomer1() {
    await this.goToStore();
    await this.loginField.click();
    await this.loginField.fill('customer1');
    await this.passwordField.click();
    await this.passwordField.fill('password');
    await this.submitButton.click();
  }

  async shouldBeLoggedIn() {
    await this.page.getByTestId('top-controller-container').waitFor({ state: 'visible' });
  }
}

