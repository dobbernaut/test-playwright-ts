import { Page } from 'playwright';
import { Listing } from '@interfaces/listing';
import { Base } from '@pages/base';

export class Listings extends Base {

  private readonly totalListingsText = '#totalCount';
  private readonly allListings = 'div[data-listingid]:not([class*="no-listing"])';
  private readonly listingsAddToWatchlist = `${this.allListings} div[class*="watchlist-corner"]`;
  private readonly listingsTitle = `${this.allListings} div[class="title"]`;

  constructor(page:Page) {
    super(page);
  }

  async totalListings(): Promise<number> {
    return parseInt(await (await this.page.$(this.totalListingsText)).textContent());
  }

  async getListings(): Promise<Listing[]> {
    const listings: any[] = [];
    await this.page.waitForSelector(this.allListings);
    for (const [index, listing] of await (await this.page.$$(this.allListings)).entries()) {
      listings.push({
        index,
        listingId: parseInt(await listing.getAttribute('data-listingid')),
        title: await this.listingTitle(index)
      });
    }
    console.log(listings.length);
    return listings;
  }

  async addListingToWatchlist(options: Listing): Promise<void> {
    let listingFound = false;
    if (!options.title && !options.listingId && !options.index) {
      expect.fail('No listing information provided. Provide either a listing title, id or index.');
    }

    for (const [index, listing] of await (await this.page.$$(this.allListings)).entries()) {
      if (options.title && await this.listingTitle(index) === options.title) {
        listingFound = true;
      } else if (options.listingId && parseInt(await listing.getAttribute('data-listingid')) === options.listingId) {
        listingFound = true;
      } else if (options.index) {
        listingFound = true;
      }
      if (listingFound) {
        await this.addToWatchlist(index);
        break;
      }
    }

    if (!listingFound) {
      expect.fail(`Failed to add listing ${options} to user watchlist`);
    }
  }

  private async listingTitle(index: number): Promise<string> {
    return await (await (await this.page.$$(this.listingsTitle))[index].textContent()).trim();
  }

  private async addToWatchlist(index: number): Promise<void> {
    await (await this.page.$$(this.allListings))[index].hover();
    await (await this.page.$$(this.listingsAddToWatchlist))[index].hover();
    await (await this.page.$$(this.listingsAddToWatchlist))[index].click();
  }

}
