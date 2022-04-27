# Test with Mocha and Playwright in TypeScript

- [Test with Mocha and Playwright in TypeScript](#test-with-mocha-and-playwright-in-typescript)
  - [Installation](#installation)
    - [Adding node packages](#adding-node-packages)
  - [Prerequisites](#prerequisites)
    - [nvm](#nvm)
      - [For Linux](#for-linux)
      - [For Mac](#for-mac)
      - [For Windows](#for-windows)
  - [Application Accounts and Tokens](#application-accounts-and-tokens)
    - [Create New User](#create-new-user)
    - [Generate Access Token](#generate-access-token)
  - [Setup](#setup)
  - [Test](#test)
    - [Run test](#run-test)
    - [UI tests - Headless mode](#ui-tests---headless-mode)
    - [Run specific tests by file or directory](#run-specific-tests-by-file-or-directory)
    - [Run tests in parallel](#run-tests-in-parallel)
    - [Watch a test file](#watch-a-test-file)
    - [Test report](#test-report)
  - [Lint and Format](#lint-and-format)
  - [Structure](#structure)
    - [Artifacts](#artifacts)
    - [Config](#config)
    - [Constants](#constants)
    - [Scripts](#scripts)
    - [Services](#services)
    - [Pages](#pages)
    - [Tests](#tests)

This is a sample testing project that runs on [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started) for package management in [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

It uses [Mocha](https://mochajs.org/) for the test framework and [Chai](https://mochajs.org/) to perform test assertions, [playwright](https://playwright.dev/docs/intro) for ui testing and [axios](https://axios-http.com/) as an http client for making http or service requests to test.

See [structure](#structure) for a description of the test project structure.

## Installation

Have [nvm](https://github.com/nvm-sh/nvm) installed to make it easier to manage node from your local environment. Yarn is also required to be installed with node and npm. Later versions of node should include yarn by default, if not, follow the install steps from the [prerequisites](#yarn).

```bash
nvm use
yarn install
```

### Adding node packages

Using [yarn install](https://classic.yarnpkg.com/en/docs/cli/install) is used to install all dependencies from this package.

To [add](https://classic.yarnpkg.com/en/docs/cli/add), use `yarn add -D { package-name }` for adding new packages and;

`yarn upgrade { package-name }@{ version-number }` for [upgrading](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) existing packages.

## Prerequisites

### [nvm](https://github.com/nvm-sh/nvm)

#### For Linux

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# check nvm installed
command -v nvm

# install node
nvm install node

# or with a specific version
nvm install node 16.13.0

# it default to the first node installed but to use a different version
nvm use 16.13.0

# install yarn globally
npm install -g yarn

# check yarn working properly
yarn --version
```

#### For Mac

```
brew install nvm
nvm install `cat .nvmrc`
nvm use `cat .nvmrc`
```

#### For Windows

Download the setup.zip file from the [latest release](https://github.com/coreybutler/nvm-windows/releases), extract and run setup as administrator.

**Run terminal as administrator to run and use nvm.**

```bash
# check nvm installed
nvm

# install a version of node
nvm install 16.13.0

# use a version of node
nvm use 16.13.0

# check if yarn is installed
yarn -v

# if yarn not installed, install it globally
npm install -g yarn
```

## Application Accounts and Tokens

This test uses the [Trade Me sandbox](https://www.tmsandbox.co.nz/). You will need to have a user created on the Trade Me sandbox and have generated OAuth tokens for the user to run these. You will then use these information for the environment variables as instrctured on the Test section.

### Create New User

Please go **[here to register and create a new user](https://www.tmsandbox.co.nz/Members/Register.aspx)** **OR** register from the main page.

![register](files/register.png)

And once you have created a new user and logged in, go to the users' **[My Trade Me API Application](https://www.tmsandbox.co.nz/MyTradeMe/Api/MyApplications.aspx)** **OR** open it from My Trade Me

![viewMyTradeMe](files/viewMyTradeMe.png)

![myTradeMeAPIApplications](files/myTradeMeAPIApplications.png)

Go to Developer options and then register a new application. Once you have created a new application, you should see your application from 'Developer options' with a **Consumer key** and a **Consumer secret**. You will then use this to generate an access token for the API.

![viewDeveloperOptions](files/viewDeveloperOptions.png)

![viewRegisterANewApplication](files/viewRegisterANewApplication.png)

### Generate Access Token

To make Trade Me API calls, you will need to to be a Trade Me member and obtain an Oauth token. To create one for yourself, use the access token generator from the **[Trade Me developer site](https://developer.trademe.co.nz/api-overview/authentication/)**.

![generateAccessToken](files/generateAccessToken.png)

Provide the consumer key and secret to generate the oauth token and secret.

You will then use and add all these information to your environment variables.

## Setup

To set up the project, install the node packages by running

```bash
yarn ci
```

## Test
The tests involves logging in and providing authorisation tokens retreived from the environment variables. When running these tests from a build pipeline, add these to the pipeline environment variables.

To set this on your machine, you will need to add these environment variables with the corresponding value **OR** you can **use the two test commands provided below under the Run test section**.

```text
testuser=REPLACEWITHtestusername
testpassword=REPLACEWITHuserpassword
token=REPLACEWITHoauthtoken
tokensecret=REPLACEWITHoauthtokensecret
key=REPLACEWITHconsumerkey
keysecret=REPLACEWITHconsumersecret
```

### Run test

For running the ui tests, use:
```bash
yarn test-ui tests/ui
```

**to include the required environment variables from the command line:**
```bash
testuser=**REPLACEWITHtestusername** testpassword=**REPLACEWITHuserpassword** token=**REPLACEWITHoauthtoken** tokensecret=**REPLACEWITHoauthtokensecret** key=**REPLACEWITHconsumerkey** keysecret=**REPLACEWITHconsumersecret** yarn test-ui tests/ui
```

For running the api tests, use:
```bash
yarn test-api
```

**to include the required environment variables from the command line:**
```bash
testuser=**REPLACEWITHtestusername** testpassword=**REPLACEWITHuserpassword** token=**REPLACEWITHoauthtoken** tokensecret=**REPLACEWITHoauthtokensecret** key=**REPLACEWITHconsumerkey** keysecret=**REPLACEWITHconsumersecret** yarn test-api
```

### UI tests - Headless mode

By default, UI tests are running on browsers in non-headless mode (browser visible). To have the tests running in headless mode (no browser visible), use the `headless` suffixed yarn scripts. ie

```bash
yarn test-ui-headless tests/ui
```

### Run specific tests by file or directory

You can run a specific test by passing a test file or folder to the test-ui script. eg:

If you have a test structure like:

```
|-- test
|   |-- scenario1
|       |-- file-1a.test.ts
|       |-- file-1b.test.ts
|   |-- scenario2
|       |-- file-2a.test.ts
```

```bash
# running test:ui script passing a directory
yarn test-ui test/scenario1
# will run file-1a and file-1b tests

# running test:ui script passing a file
yarn test-ui test/scenario2/file-2a.test.ts
# will run file-2a test
```

### Run tests in parallel

You can run all the tests in parallel by using the :parallel script. Other scripts have a :parallel variant if you need to run specific test files or directory with test:ui by adding :parallel `yarn test-ui-parallel`.

```bash
# adding :parallel to test:file will run all tests under test/scenario1 in parallel
yarn test-ui-parallel test/scenario1

```

### Watch a test file

You can have a test or sets of tests to automatically rerun after saving your changes by providing a directory, file or list of both to the watch option.

```bash
yarn test-ui-watch test/scenario1/file-1a.test.ts
```

### Test report

There is an html report generated after every run of our tests. These are saved under the `artifacts/report` folder. This should provide additional resource for reviewing the test results outside of the test runner from the console.

## Lint and Format

Formatting and linting of source files are enforced by [eslint].

Most editors can integrate directly with these tools, so that files will be checked and formatted.

The IDE will highlight issues and errors based on rules that were set in [.eslintrc.json](.eslintrc.json) to be fixed, see eslint [rules](https://eslint.org/docs/rules/). Here are the npm scripts to lint and check formatting:

- `yarn lint` - see if there are linting issues and what files are not formatted correctly.
- `yarn lint-fix` - try to fix fixable eslint errors and re-format files according to rules.

## Structure

```
.
|-- test
|   |-- artifacts
|       |-- reports
|           |--report_20420908_121213.html
|   |-- config
|       |-- config.ts
|   |-- constants
|   |-- scripts
|   |-- services
|       |-- sample-api-service
|           |-- api-endpoints.ts
|           |-- api-endpoints-helper.ts
|           |-- index.ts
|       |-- aws-utility-service
|           |-- aws.ts
|   |-- pages
|       |-- base.page.ts
|       |-- store
|           |-- catalog-search.page.ts
|           |-- store.page.ts
|   |-- tests
|       |-- scenario-group
|           |-- group-1
|               |-- group-1.test.ts
|               |-- group-1a.test.ts
|           |-- group-2
|               |-- group-2.test.ts
|               |-- group-2a.test.ts
|-- package.json
|-- *config.json
```

### Artifacts

- Have all test artifacts save here ie test result reports, error screenshots and logs.

### Config

- All test related configurations should live here. Do not confuse with configs for node packages and dependencies like eslint, mocha configs on the main directory.

### Constants

- Contains constants to use for test and function arguments.
- **Example** http response status codes.

### Scripts

- Any scripts we need to run adjacent to our test suite like hooks or running build pipelines.
- Exceptions could be when a build tool requires their scripts on a specific directory eg: github actions requires them to be on a .github directory from the main directory.

### Services

- All services under test and utilities for the test suite are here. If you need to get data from a web service or a configuration or secret from a key store, create a service folder for that resource or purpose here.
- **Example** if you want to read a json file from aws s3, create an aws utility folder here and have an s3.ts file that contains methods for getting files from s3 etc.

```
|-- services
|   |-- aws
|       |-- s3.ts
|   |-- kafka
|       |-- kafka.ts
|   |-- blog-post
|       |-- blog-post.ts
|       |-- blog-post-helper.ts
|       |-- index.ts
```

- **index.ts** - Use index to export all files from a directory so there's not much clutter from the import statements when importing a few classes or methods from files spread inside the directory eg:

```
|-- service
|   |-- blog-post
|       |-- blog-post.ts
|       |-- blog-post-helper.ts
|       |-- index.ts
```

```javascript
// blog-post.ts

export const blogPostFunction = () => {
  console.log('hello from blog post function');
};
```

```javascript
// blog-post-helper.ts

export const blogPostFunctionHelper = () => {
  console.log('hello from blog post function helper');
};
```

```javascript
// index.ts

export * from './blog-post';
export * from './blog-post-helper';
```

```javascript
// file.test.ts

import { blogPostFunction, blogPostFunctionHelper } from './services/blog-post';
```

### Pages

- Similar to services, all page objects are here. Have each pages represent the tree map of the application.
- Each page is composed of the element selectors and the page actions.

```
|-- pages
|   |-- sample.page.ts
```

```javascript
// sample.page.ts

import { BasePage } from '@page/base.page';

export class SamplePage extends BasePage {
  #sampleButton = 'button[type="sample"]';
  /**
   * Do some sampling.
   *
   * @returns {Promise<number>}
   */
  async sample() {
    await this.page.click(this.#sampleButton);
  }
}
```

### Tests

- All tests for your application are here. Suffix the test files with .test.ts. Try grouping them by logical parts of the application or service.

```
|-- tests
|   |-- blog-posts
|       |-- add-update.test.ts
|       |-- delete.test.ts
|       |-- get.test.ts
```
