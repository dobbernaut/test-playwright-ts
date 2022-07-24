import { roles } from '@config/config';
import { CartItems, HomePage, InventoryItem, InventoryPage, ShoppingCartPage } from '@page/sauce-demo';
import { expect } from 'chai';

describe('Swag Labs demo app', function () {
  let homePage: HomePage;
  let inventoryPage: InventoryPage;
  let shoppingCartPage: ShoppingCartPage;

  before(async function () {
    homePage = new HomePage(this.page);
    inventoryPage = new InventoryPage(this.page);
    shoppingCartPage = new ShoppingCartPage(this.page);

    await homePage.open();
    await homePage.login(roles.sauceDemoRole);
  });

  after(async function () {
    await inventoryPage.header.logout();
  });

  it('Add item to shopping cart', async function () {
    const itemToAdd = 'Backpack';

    const item = await inventoryPage.getAllItems().then(async (items: InventoryItem[]) => {
      return await items.find((item) => {
        return item.name.includes(itemToAdd);
        // item.name.includes(itemToAdd)).addToCart();
      });
    });
    await item.addToCart();
    await inventoryPage.header.openShoppingCart();
    await shoppingCartPage.getCartItems().then((items: CartItems[]) => {
      expect(
        items.find((item) => item.name.includes(itemToAdd)),
        `Expected to find ${itemToAdd} from cart items`
      ).to.not.be.undefined;
    });
  });
});
