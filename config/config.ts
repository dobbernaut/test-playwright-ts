import { Clients } from '@type/clients';
import { Roles } from '@type/credentials';
import { Sites } from '@type/sites';
import { TestConfig } from '@type/config';

export const siteUrl: Sites = {
  ui: 'https://tmsandbox.co.nz',
  api: 'https://api.tmsandbox.co.nz/v1',
};

export const testConfig: TestConfig = {
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
  viewport: {
    width: 1280,
    height: 1024
  }
};

const getPassword = (): string => {
  if (process.env.testpassword) {
    return process.env.testpassword;
  } else {
    console.warn('No password was set for the test role. Add environment variable testpassword');
  }
};

const getUserName = (): string => {
  if (process.env.testuser) {
    return process.env.testuser;
  } else {
    console.warn('No username was set for the test role. Add environment variable username');
  }
};

export const roles: Roles = {
  testRole: {
    username: getUserName(),
    password: getPassword()
  }
};

const getToken = (): string => {
  if (process.env.token) {
    return process.env.token;
  } else {
    console.warn('No oauthToken was set for client. Add environment variable token');
  }
};

const getTokenSecret = (): string => {
  if (process.env.tokensecret) {
    return process.env.tokensecret;
  } else {
    console.warn('No oauthTokenSecret was set for the client. Add environment variable tokensecret');
  }
};

const getKey = (): string => {
  if (process.env.key) {
    return process.env.key;
  } else {
    console.warn('No consumerKey was set for the client. Add environment variable key');
  }
};

const getKeySecret = (): string => {
  if (process.env.keysecret) {
    return process.env.keysecret;
  } else {
    console.warn('No consumerSecret was set for the client. Add environment variable keysecret');
  }
};

export const clients: Clients = {
  testClient: {
    oauthToken: getToken(),
    oauthTokenSecret: getTokenSecret(),
    consumerKey: getKey(),
    consumerSecret: getKeySecret()
  }
};
