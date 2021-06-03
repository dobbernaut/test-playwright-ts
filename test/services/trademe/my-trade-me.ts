import axios, { AxiosResponse } from 'axios';
import { siteUrl } from '@test/config';
import { WatchlistFilter } from '@enums/watchlist-filter';
import { BaseService } from '@services/trademe/base';

export class MyTradeMe extends BaseService {

  retreiveWatchlist(filter: WatchlistFilter): Promise<AxiosResponse<any>> {
    return axios.get(
      `${siteUrl.api}/MyTradeMe/Watchlist/${filter}.json`,
      { headers: { Authorization: this.memberAuthentication() } }
    );
  }

  addListingToWatchlist(listingId: number): Promise<AxiosResponse<any>> {
    return axios.post(
      `${siteUrl.api}/MyTradeMe/Watchlist/${listingId}.json`, null,
      { headers: { Authorization: this.memberAuthentication() } }
    );
  }

  removeListingFromWatchlist(listingId: number): Promise<AxiosResponse<any>> {
    return axios.delete(
      `${siteUrl.api}/MyTradeMe/Watchlist/${listingId}.json`,
      { headers: { Authorization: this.memberAuthentication() } }
    );
  }

}
