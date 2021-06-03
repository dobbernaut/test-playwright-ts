import { WatchlistFilter } from '@enums/watchlist-filter';
import { MyTradeMe } from '@services/trademe/my-trade-me';
import { Search } from '@services/trademe/search';

describe('Watchlist', function() {

  const search = new Search();
  const myTradeMe = new MyTradeMe();

  let listingId: number;

  before( async function() {
    await search.general({ category: '0002-0356-', search_string: 'product' })
      .then(response => {
        const searchResults = response.data;
        if (searchResults.List && searchResults.List.length > 0) {
          listingId = searchResults.List[0].ListingId;
        } else {
          expect.fail('No listing was found');
        }
      })
      .catch(error => {
        search.errorHandler(error);
      });
  });

  after( async function() {
    await myTradeMe.removeListingFromWatchlist(listingId)
      .then(response => {
        expect(response.data.Success).to.true;
      })
      .catch(error => {
        myTradeMe.errorHandler(error);
      });
  });

  it('should add a listing to user watchlist', async function() {
    await myTradeMe.addListingToWatchlist(listingId)
      .then(response => {
        expect(response.data.Success).to.be.true;
      })
      .catch(error => {
        myTradeMe.errorHandler(error);
      });
  });

  it('should have the added listing on user watchlist', async function() {
    await myTradeMe.retreiveWatchlist(WatchlistFilter.All)
      .then(response => {
        const listingIds = response.data.List.map( listing => {
          return listing.ListingId;
        });
        expect(listingIds).to.contain(listingId);
      })
      .catch(error => {
        myTradeMe.errorHandler(error);
      });
  });

});
