import { Page } from 'playwright';
import { Header } from './header';

export type CartItems = {
  index: number;
  quantity: number;
  name: string;
  price: string;
  removeFromCart(): Promise<void>;
};

export class ShoppingCartPage {
  private page: Page;
  private _header: Header;

  constructor(page: Page) {
    this.page = page;
    this._header = new Header(this.page);
  }

  get header() {
    return this._header;
  }

  private readonly continueShoppingButton = '#continue-shopping';
  private readonly itemsList = '.cart_item';
  private readonly itemsQuantity = '.cart_item .cart_quantity';
  private readonly itemsName = '.cart_item .inventory_item_name';
  private readonly itemsPrice = '.cart_item .inventory_item_price';
  private readonly itemsRemoveFromCart = '.cart_item button[id*="remove"]';

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }

  async getCartItems(): Promise<CartItems[]> {
    const items: CartItems[] = [];
    const itemEntries = await (await this.page.$$(this.itemsList)).entries();
    for (const item of itemEntries) {
      const index = item[0];
      items.push({
        index,
        quantity: parseInt(await (await (await this.page.$$(this.itemsQuantity))[index].textContent()).trim()),
        name: await (await (await this.page.$$(this.itemsName))[index].textContent()).trim(),
        price: await (await (await this.page.$$(this.itemsPrice))[index].textContent()).trim(),
        removeFromCart: async () => {
          await (await (this.page.$$(this.itemsRemoveFromCart))[index].click());
        },
      });
    }
    return items;
  }
}
