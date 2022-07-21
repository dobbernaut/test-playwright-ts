import { Page } from 'playwright';

export class Header {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private readonly shoppingcartButton = '.shopping_cart_link';
  private readonly menuButton = '#react-burger-menu-btn';
  private readonly logoutButton = '#logout_sidebar_link';

  async openShoppingCart() {
    await this.page.click(this.shoppingcartButton);
  }

  async logout() {
    await this.openMenu();
    await this.page.click(this.logoutButton);
  }

  async openMenu() {
    await this.page.click(this.menuButton);
  }
}
