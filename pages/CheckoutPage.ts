import { Page, Locator } from '@playwright/test';

export interface ShippingInformation {
  firstName: string;
  lastName: string;
  email: string;
  zipcode: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly zipcodeField: Locator;
  readonly confirmPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByTestId('firstname-field');
    this.lastNameField = page.getByTestId('lastname-field');
    this.emailField = page.getByTestId('email-field');
    this.zipcodeField = page.getByTestId('zipcode-field');
    this.confirmPaymentButton = page.getByTestId('confirm-payment-button');
  }

  async provideShippingDetails(shippingInfo: ShippingInformation) {
    await this.firstNameField.click();
    await this.firstNameField.fill(shippingInfo.firstName);
    await this.lastNameField.click();
    await this.lastNameField.fill(shippingInfo.lastName);
    await this.emailField.click();
    await this.emailField.fill(shippingInfo.email);
    await this.zipcodeField.click();
    await this.zipcodeField.fill(shippingInfo.zipcode);
  }

  async placeOrder() {
    await this.confirmPaymentButton.click();
  }
}

