import { Page } from 'playwright';
import { Credentials } from '@interfaces/credentials';
import { siteUrl } from '../config';

export class Base {

  page: Page;

  private readonly loginLink = '#LoginLink';
  private readonly email = '#page_email';
  private readonly password = '#page_password';
  private readonly login = '#LoginPageButton';
  private readonly logout = 'input[name="logout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async logIn(role: Credentials): Promise<void> {
    await this.page.goto(siteUrl.ui);
    await this.page.click(this.loginLink);
    await this.page.fill(this.email, role.username);
    await this.page.fill(this.password, role.password);
    await this.page.click(this.login);
    await this.waitForLogout();
  }

  async logOut(): Promise<void> {
    await this.page.click(this.logout);
    await this.waitForLogin();
  }

  private async waitForLogout(): Promise<void> {
    await this.page.waitForSelector(this.logout);
  }

  private async waitForLogin(): Promise<void> {
    await this.page.waitForSelector(this.loginLink);
  }

}
