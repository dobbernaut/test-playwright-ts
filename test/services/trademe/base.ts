import { inspect } from 'util';
import { clients } from '@test/config';
import { expect } from 'chai';

export class BaseService {

  appAuthentication(): string {
    return `OAuth oauth_consumer_key="${clients.testClient.consumerKey}", ` +
      `oauth_signature_method="PLAINTEXT", oauth_signature="${clients.testClient.consumerSecret}&"`;
  }

  memberAuthentication(): string {
    return `OAuth oauth_consumer_key="${clients.testClient.consumerKey}", ` +
      `oauth_token="${clients.testClient.oauthToken}", oauth_signature_method="PLAINTEXT", ` +
      `oauth_signature="${clients.testClient.consumerSecret}&${clients.testClient.oauthTokenSecret}"`;
  }

  errorHandler(error: any): void {
    if (error.response) {
      expect.fail(`Request failed. Status: ${error.response.status} - ${error.response.statusText}\n` +
        `Error: ${inspect(error.response.data)}`);
    } else {
      expect.fail(`Request timeout. Error: ${error}`);
    }
  }

}
