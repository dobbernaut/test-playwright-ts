import axios, { AxiosResponse } from 'axios';
import { siteUrl } from '@config/config';
import { GeneralSearch } from '@type/search';
import { BaseService } from '@service/trademe/base';

export class Search extends BaseService {

  general(search: GeneralSearch): Promise<AxiosResponse<any>> {
    return axios.get(
      `${siteUrl.trademe.api}/Search/General.json`,
      {
        params: search,
        headers: { Authorization: this.appAuthentication() }
      }
    );
  }

}
