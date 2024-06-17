# CryptoRaiser

A Web3 Blockchain Crowdfunding Platform using a smart contract.

[Demo Link](https://crypto-raiser.netlify.app/)

![Showcase Image](/client/src/assets/showcase.png)

## Technologies used

- React
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- Docker
- Solidity
- third-web
- Blockchain wallets (Metamask, coinbase, walletConnect, Smart Account, Safe, In-App, Local Wallet, Rainbow, Zerion, Blocto, Frame, Phantom, Coin98, Core Wallet, Crypto Defi, OKX Wallet, OneKey Wallet, Rabby Wallet, XDEFI Wallet)

## Deploy

### Locally

1. Create `.env` in the `client` folder and the `thirdweb-contracts` folder using the example
2. `cd client`
3. Run `yarn install` or `npm i` to install dependencies
4. Run `yarn dev` or `npm run dev` to start the dev server
5. `cd thirdweb-contracts`
6. Run `yarn install` or `npm i` to install dependencies
7. Run `yarn deploy` or `npm run deploy` to deploy the contract

### With Docker

1. Open Docker Desktop
2. Create `.env` in the `client` folder and the `thirdweb-contracts` folder using the example
3. `cd client`
4. Run `docker build -t CryptoRaiser .`
5. Run `docker run -p 3000:3000 CryptoRaiser`

## Important links

1. [Thirdweb](https://thirdweb.com/) - for creating a contract and deploying it to the blockchain.
2. [infura](https://app.infura.io/) - for creating an account and getting an API key.

## To-Do

I have identified some issues that could be optimized.

Currently, the project is limited to creating fundraising events, but there is no follow-up processing after the events conclude. Below are the identified deficiencies and proposed modifications:

- [ ] **1. Automatic Donation Handling Adjustments**:

  - Originally, the contract stipulated that donations would be transferred directly to the event creator after being received. The amendments are as follows:
    - If the funding exceeds 100% at the event's conclusion, the funds are automatically given to the event creator.
    - If the funding does not exceed 100% at the event's conclusion, the donations are automatically refunded to the donors, indicating that the fundraising was unsuccessful.

- [ ] **2. Prevention of Duplicate Processing**:

  - After modifying the donation handling mechanism, it is necessary to implement a mechanism to prevent duplicate processing.

- [ ] **3. Display and Management of Event Status**:

  - Currently, there is no display of the event status on the screen, nor is there any proper handling of expired events. Therefore, an event status feature will be added, with statuses including: ongoing event, event concluded with successful fundraising, and event concluded with unsuccessful fundraising (refunds made to donors). This will facilitate front-end processing and inform users of the event's progress.

- [ ] **4. Contract Upgrade Feature**:

  - A contract upgrade feature will be added because after identifying shortcomings, it was found that contracts cannot be deleted, whether on the testnet or the mainnet. However, it is possible to deploy new versions of the contract. In future contract development, it will be necessary to include a migration mechanism or upgrade plan to avoid the need for redeployment when additions or changes are made.

- [ ] **5. Security Measures Against Reentrancy Attacks**:

  - When using `.call{value:...}("")` for transferring Ether, it should be noted that this method can potentially lead to reentrancy attacks. Although this code changes the state immediately after the transfer, reducing the risk, it is safer to use `transfer()` or `send()`, or to change the state before executing the payment to prevent potential security issues.

- [ ] **6. Optimize Data Storage Structure**:

  - Using dynamic arrays `donators` and `donations` to store all donation information may consume a lot of gas, especially when there are many donations. Consider using a mapping to track the total donations of each donor, which might be more efficient.

- [ ] **7. Access Control for finalizeCampaign Function**:

  - Currently, there are no restrictions on who can call the `finalizeCampaign` function, which could allow anyone to attempt to conclude the event. Usually, only the event owner or contract administrator should be allowed to perform this action. If `finalizeCampaign` needs to be executed automatically after the event ends, use third-party services (such as Chainlink Keepers or Ethereum Alarm Clock) to periodically check the conditions and automatically execute the smart contract functions, as Solidity itself does not support automatic execution.

- [ ] **8. Utilize External Time Source for Business Logic**:

  - When using `block.timestamp` as part of the business logic, it should be noted that miners can manipulate block timestamps within a certain range. If you do not use `block.timestamp`, consider using an external time source to set and check the time. This can be achieved through a decentralized oracle (e.g., Chainlink).

- [ ] **9. Addition of Smart Contract Events**:
  - Added events `CampaignCreated`, `DonationReceived`, and `CampaignFinalized` to facilitate front-end applications in tracking changes in the contract status.

## Source

[benroz3/CryptoRaiser](https://github.com/benroz3/CryptoRaiser)
