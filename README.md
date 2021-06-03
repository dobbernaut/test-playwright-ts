# Description

This is a sample test suite for testing web UI and APIs.

The tests runs on node and is written on Typescript. It uses [axios](https://axios-http.com/) as the http client for testing the services and [playwright](https://playwright.dev/docs/intro) for the website. Both are using [Mocha](https://mochajs.org/) for the test framework and [chai](https://www.chaijs.com/api/) for assertions.

# Sample

There is a sample test suite branch in this repo called `sample-test-suite`. Check out the branch to have a sample test to run.

# Prerequisites

You will need to have [Node](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed and able to run yarn commands. Run the commands shown here from bash or shell.

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

# Setup

To set up the project, install the node packages by running

```bash
yarn ci
```

# Test
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

## Run test

For running the ui tests, use:
```bash
yarn test-ui
```

**to include the required environment variables from the command line:**
```bash
testuser=**REPLACEWITHtestusername** testpassword=**REPLACEWITHuserpassword** token=**REPLACEWITHoauthtoken** tokensecret=**REPLACEWITHoauthtokensecret** key=**REPLACEWITHconsumerkey** keysecret=**REPLACEWITHconsumersecret** yarn test-ui
```

For running the api tests, use:
```bash
yarn test-api
```

**to include the required environment variables from the command line:**
```bash
testuser=**REPLACEWITHtestusername** testpassword=**REPLACEWITHuserpassword** token=**REPLACEWITHoauthtoken** tokensecret=**REPLACEWITHoauthtokensecret** key=**REPLACEWITHconsumerkey** keysecret=**REPLACEWITHconsumersecret** yarn test-api
```
