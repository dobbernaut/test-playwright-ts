export interface Clients {
  [x: string]: Client;
}

export interface Client {
  oauthToken: string;
  oauthTokenSecret: string;
  consumerKey: string;
  consumerSecret: string;
}
