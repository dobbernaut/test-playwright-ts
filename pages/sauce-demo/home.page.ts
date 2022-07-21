import { siteUrl } from '@config/config';
import { Credentials } from '@type/credentials';
import { Page } from 'playwright';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';

  async open(): Promise<void> {
    await this.page.goto(siteUrl.sauceDemo);
  }

  async login(account: Credentials): Promise<void> {
    await this.page.fill(this.usernameInput, account.username);
    await this.page.fill(this.passwordInput, account.password);
    await this.page.click(this.loginButton);
  }
}
