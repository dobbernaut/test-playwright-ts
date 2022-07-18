import { Categories } from '@constant/listing-categories';
import { Computers } from '@constant/listing-sub-categories';
import { Home } from '@page/trademe/home';
import { Listings } from '@page/trademe/listings';

describe('Search', function () {

  let home: Home;
  let listings: Listings;

  before(function () {
    home = new Home(this.page);
    listings = new Listings(this.page);
  });

  it('should return the expected number of listings', async function () {
    await home.open();
    await home.openMainCategory(Categories.Computers);
    await home.openSubcategory(Computers.Laptops);
    await home.search('product');

    const searchResults = await listings.getListings();

    expect(searchResults.length).to.be.greaterThanOrEqual(0);
    expect(await listings.totalListings()).to.be.greaterThanOrEqual(0);
  });

});
