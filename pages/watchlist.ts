import { ElementHandle, Page } from 'playwright';
import { Listing } from '@type/listing';
import { Base } from '@page/base';

export class Watchlist extends Base {

  private readonly delete = 'input[value="Delete"]';
  private readonly confirmDeletion = '#submit1';
  private readonly cancelDeletion = '#cancel';

  private readonly watchlistForm = 'form[action*="Watchlist"][method*=get]';
  private readonly listingsCheckbox = 'td[align="center"] input[type="checkbox"]:not([id*="cmdSelect"])';

  constructor(page: Page) {
    super(page);
  }

  async getListingsOnWatchlist(): Promise<Listing[]> {
    const listings: Listing[] = [];
    await this.waitForWatchlistForm();
    for (const [index, watchlistListing] of await (await this.page.$$(this.listingsCheckbox)).entries()) {
      listings.push({
        index: index,
        listingId: await this.getListingIdFromCheckbox(watchlistListing)
      });
    }
    return listings;
  }

  async removeListingsFromWatchlist(listings: Listing[]): Promise<void> {
    await this.waitForWatchlistForm();
    for (const listing of listings) {
      let listingMatch = false;
      for (const watchlistListing of await this.page.$$(this.listingsCheckbox)) {
        const watchlistListingId = await this.getListingIdFromCheckbox(watchlistListing);
        if (listing.listingId === watchlistListingId) {
          listingMatch = true;
          await watchlistListing.click();
          break;
        }
      }
      if (!listingMatch) {
        expect.fail(`Listing "${listing}" is not on watchlist`);
      }
    }
    await this.deleteSelectedListings();
  }

  private async deleteSelectedListings(): Promise<void> {
    await this.page.click(this.delete);
    await this.page.click(this.confirmDeletion);
  }

  private async getListingIdFromCheckbox(listing: ElementHandle): Promise<number> {
    return parseInt(await (await listing.getAttribute('name')).match(/[^(chk)]\d*/)[0]);
  }

  private async waitForWatchlistForm(): Promise<void> {
    await this.page.waitForSelector(this.watchlistForm);
  }

}
