# FinGrow
Integrating the tool on payment gateways lets you identify the nature of the transaction at the time of the transaction &amp; generate these reports with the click integrated tool.

# FinGrow™

[![Release](https://img.shields.io/github/v/release/smitbaranwal/Fin-Grow_React_App)](https://github.com/fingrow/fingrow/releases)
![Coinbase](https://img.shields.io/bundlephobia/min/coinbase?style=plastic)
[![NPM](https://img.shields.io/npm/v/coinbase?style=plastic)](https://www.npmjs.com/package/@web3-onboard/coinbase)
[![Material UI](https://img.shields.io/npm/v/material?style=plastic)](https://www.npmjs.com/package/@mui/material)

FinGrow is an advanced online accounting and analytical software that is specifically designed to support the growth of businesses operating in the web3 ecosystem. In partnership with Parcel Inc., FinGrow has introduced new features to automate NFT accounting for businesses, making it easier to report primary and secondary income, categorize transactions automatically, and maintain robust documentation of capital gains and losses in compliance standards.

* [Operators] FinGrow provides real-time P&L across their accounts, enabling them to achieve world-class financial planning.
* [Accountants] Accountants can benefit from powerful integrations across crypto platforms and accounting software, which can help them unlock new client segments. 
* [Auditors] Auditors can easily verify and reconcile transactions across all wallets, exchanges, banks, and custodians in one place.

## Requirements

* Node 12.0 or higher
* Database MongoDB
* Web Server (NodeJS)

## Framework

FinGrow uses [Next.js](https://nextjs.org/), the best existing React framework, as the foundation framework and [Packages](https://github.com/smitbaranwal/Fin-Grow_React_App/blob/master/package.json) for Apps.

## Installation ⚒️

1. Make sure Node.js (LTS). If Node.js is already installed in your system, make sure the installed version is LTS (and not the latest version)
2. Navigate to the `src` folder and run following command to install our local dependencies listed in `package.json`. You can use `npm` OR `yarn` as per your preference.

```bash
# For npm
npm install --legacy-peer-deps
# For yarn
yarn install
```

3. Now, you are ready to start the server with the help of command shown below. Open [http://localhost:3000/](http://localhost:3000/) to check your development 🚀.

```bash
# For npm
npm run dev
# For yarn
yarn dev
```
## Login

To begin using FinGrow and authorize with Metamask as a blockchain wallet, follow these steps:

1. Install the Metamask extension on Google Chrome using [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB).

2. Click "Add to Chrome" and follow the prompts to create a new wallet or import an existing one. Accept the terms and conditions and choose a new password for your wallet.

3. Follow the recommended flow to generate a secret word phrase, which will be used as a recovery password. Click "Reveal Secret Word Phrase" to see a 12-word phrase, copy it and keep it safe for future use. Click "Next" and complete the phrase you generated in the previous step.

4. Pin the Metamask extension from the list of extensions, so that it will always be visible on Chrome tabs.

5. To connect to the FinGrow app, go to [Local Environment](http://localhost:3000/pages/login) or [Production Environment](https://fin-grow.vercel.app/pages/login) and click "Connect Wallet".

6. Select "Metamask" from the list of wallets and authorize the FinGrow app to access your public key accounts.

7. Click "Next" and then "Connect". Select one safe address which pops up after authorizing using the "Connect" button.

8. You will now be redirected to the Transactions page. Congratulations, you have successfully created and connected your blockchain wallet with Metamask!

Detailed process of registering and logging in with the screenshots [Login Process](https://docs.google.com/document/d/e/2PACX-1vRIiLl36e6EfLfJ8QNhfak0bBH1kaazMahIxtum_KxqixzOky-YR7YpxdKN1XleJ2tLLB_gFs6peRk3/pub)


## Contribution

To ensure that your contributions are accepted when submitting code to Fingrow, please adhere to the following guidelines:

1. Provide clear and concise commit messages and pull requests. Empty pull request messages may be rejected without explanation.

2. Follow the PSR coding standards when contributing code to Fingrow. The best approach is to emulate the existing Fingrow code.

3. Keep in mind that this project is governed by a Contributor Code of Conduct. By participating in this project, you agree to abide by its rules and regulations.

## Changelog

To view recent changes, click [Releases](../../releases).

