import { roles } from '@config/config';
import { Categories } from '@constant/listing-categories';
import { Computers } from '@constant/listing-sub-categories';
import { Home } from '@page/trademe/home';
import { Listings } from '@page/trademe/listings';
import { Watchlist } from '@page/trademe/watchlist';
import { Listing } from '@type/listing';

describe('Watchlist', function () {

  let home: Home;
  let listings: Listings;
  let watchlist: Watchlist;

  let listingToAdd: Listing;

  before(async function () {
    home = new Home(this.page);
    listings = new Listings(this.page);
    watchlist = new Watchlist(this.page);

    await home.logIn(roles.testRole);
  });

  after(async function () {
    await watchlist.removeListingsFromWatchlist([listingToAdd]);
    await home.logOut();
  });

  it('should add a listing to the user watchlist', async function () {
    await home.open();
    await home.openMainCategory(Categories.Computers);
    await home.openSubcategory(Computers.Laptops);
    await home.search('product');

    const searchResults = await listings.getListings();
    listingToAdd = searchResults[0];

    await listings.addListingToWatchlist(listingToAdd);
    await home.viewWatchlist();
    const watchlistListingIds: number[] = (await watchlist.getListingsOnWatchlist()).map(watchlistListing => {
      return watchlistListing.listingId;
    });

    expect(watchlistListingIds).to.contain(listingToAdd.listingId);
  });

});
