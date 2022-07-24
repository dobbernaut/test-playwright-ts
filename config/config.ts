import { Roles } from '@type/credentials';
import { Sites } from '@type/sites';
import { TestConfig } from '@type/config';
import dotenv from 'dotenv';

export const siteUrl: Sites = {
  jsonplaceholder: 'https://jsonplaceholder.typicode.com',
  sauceDemo: 'https://www.saucedemo.com/',
};

export const testConfig: TestConfig = {
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
  viewport: {
    width: 1280,
    height: 1024
  }
};

const getPassword = (): string => {
  dotenv.config();
  if (process.env.testpassword) {
    return process.env.testpassword;
  } else {
    console.warn('No password was set for the test role. Add environment variable testpassword');
  }
};

export const roles: Roles = {
  sauceDemoRole: {
    username: 'standard_user',
    password: getPassword(),
  }
};
