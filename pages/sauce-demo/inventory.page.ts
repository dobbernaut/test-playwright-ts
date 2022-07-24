import { Page } from 'playwright';
import { Header } from './header';

export type InventoryItem = {
  name: string;
  price: string;
  addToCart(): Promise<void>;
};

export class InventoryPage {
  private page: Page;
  private _header: Header;

  constructor(page: Page) {
    this.page = page;
    this._header = new Header(this.page);
  }

  get header() {
    return this._header;
  }

  private readonly itemsList = '.inventory_item';
  private readonly itemsName = '.inventory_item_name';
  private readonly itemsPrice = '.inventory_item_price';

  async getAllItems(): Promise<InventoryItem[]> {
    const items: InventoryItem[] = [];
    const itemEntries = await this.page.$$(this.itemsList);
    for (const item of itemEntries) {
      items.push({
        name: await (await (await item.$(this.itemsName)).textContent()).trim(),
        price: await (await (await item.$(this.itemsPrice)).textContent()).trim(),
        async addToCart() {
          await (await item.$('button[id*="add-to-cart"]')).click();
        },
      });
    }
    return items;
  }
}
