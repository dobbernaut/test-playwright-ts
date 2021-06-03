import axios, { AxiosResponse } from 'axios';
import { siteUrl } from '@test/config';
import { GeneralSearch } from '@interfaces/search';
import { BaseService } from '@services/trademe/base';

export class Search extends BaseService {

  general(search: GeneralSearch): Promise<AxiosResponse<any>> {
    return axios.get(
      `${siteUrl.api}/Search/General.json`,
      {
        params: search,
        headers: { Authorization: this.appAuthentication() }
      }
    );
  }

}
