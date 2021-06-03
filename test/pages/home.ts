import { Page } from 'playwright';
import { Base } from '@pages/base';
import { siteUrl } from '@test/config';

export class Home extends Base {

  private readonly searchBox = '#searchString';
  private readonly searchButton = 'button[value="Search"]';
  private readonly searchResultsHeading = 'h1[class*="search-results"]';

  private readonly openWatchlistDropdown = '#SiteHeader_SiteTabs_BarOfSearch_watchlistDropdownOpen';
  private readonly watchlistLink = '#viewWatchlistDropDownLink';
  private readonly watchlistDropdown = '#watchlist-toggle-extension-line';

  private readonly mainCategory = '#main-box-categories';
  private readonly mainCategories = '#main-box-categories li a';
  private readonly subcategory = '#CategoryNavigator_CategoryPlaceholder';
  private readonly subcategories = '#CategoryNavigator_CategoryPlaceholder li a';

  constructor(page: Page){
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto(siteUrl.ui);
  }

  async search(search: string): Promise<void> {
    await this.page.fill(this.searchBox, search);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchResultsHeading);
  }

  async toggleWatchlistDropdown(): Promise<void> {
    await this.page.click(this.openWatchlistDropdown);
    await this.page.waitForSelector(this.watchlistDropdown);
  }

  async viewWatchlist(): Promise<void> {
    await this.toggleWatchlistDropdown();
    await this.page.click(this.watchlistLink);
  }

  async openMainCategory(category: string): Promise<void> {
    await this.page.waitForSelector(this.mainCategory);
    let categoryFound = false;
    for (const mainCategory of await this.page.$$(this.mainCategories)) {
      if (await mainCategory.textContent() === category) {
        await mainCategory.click();
        categoryFound = true;
        break;
      }
    }
    if (!categoryFound) {
      expect.fail(`Category "${category}" was not found from main categories`);
    }
  }

  async openSubcategory(category: string): Promise<void> {
    await this.page.waitForSelector(this.subcategory);
    let subcategoryFound = false;
    for (const subcategory of await this.page.$$(this.subcategories)) {
      if (await subcategory.textContent() === category) {
        await subcategory.click();
        subcategoryFound = true;
        break;
      }
    }
    if (!subcategoryFound) {
      expect.fail(`Subcategory "${category}" was not found from subcategories`);
    }
  }


}
