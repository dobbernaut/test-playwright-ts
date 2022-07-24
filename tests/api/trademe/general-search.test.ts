import { Search } from '@service/trademe/search';

describe('General Search', function () {

  const search = new Search();

  it('should return search results given a category and a search string', async function () {
    await search.general({ category: '0002-0356-', search_string: 'product' })
      .then(response => {
        const searchResults = response.data;
        expect(searchResults.TotalCount).to.be.greaterThanOrEqual(0);
        expect(searchResults.List.length).to.be.greaterThanOrEqual(0);
      })
      .catch(error => {
        search.errorHandler(error);
      });
  });

});
