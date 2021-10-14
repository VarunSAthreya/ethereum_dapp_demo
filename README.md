# Ethereum DAPP Demo

This project demonstrates a basic `DAPP` using on the **[Ethereum blockchain](https://ethereum.org/)**, this project is developed using **[Hardhat](https://hardhat.org/)**, **[EtherJS](https://docs.ethers.io/v5/)** and frontend in **[NextJS](https://nextjs.org/)**.

## Getting Started

Prerequisites:

- **[NodeJS](https://nodejs.org/en/)**
- **[Metamask](https://metamask.io/)**

### Cloning the project

Clone the project using the following command:

_(With github CLI)_

```sh
gh repo clone VarunSAthreya/ethereum_dapp_demo
```

_(Without CLI)_

```sh
git clone https://github.com/VarunSAthreya/ethereum_dapp_demo.git
```

### Installing Dependencies

Make sure you have `NodeJS` is installed for this.

To install dependencies, run the following command:

```sh
npm install
```

### Running the project

#### Compiling the project contracts

To compile the contacts and generate abi, run the following command:

```sh
npx hardhat compile
```

**Note:** This command will generate a folder `artifacts` in the root of the project, which contains the compiled contracts and the abi.

#### Deploying the contracts

Then to deploy the contracts to `local test network` first we have to generate local test nodes.
For this, run the following command:

```sh
npx hardhat node
```

**Note:** Don't close this terminal as it will suspend `local test network`.

Then we get `20 local test account` and addresses which we can use to deploy the contracts. Each account has `10,000 fake ethers`.

Then to deploy the contracts, run the following command:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

After the contracts are deployed, we get the address of the contracts(`Greeter` and `Token`) in the terminal.

Copy those addresses and then save them in `.env.local` file as:

```sh
NEXT_PUBLIC_GREETER = <YOUR GREETER CONTRACT DEPLOYED ADDRESS>
NEXT_PUBLIC_TOKEN = <YOUR TOKEN CONTRACT DEPLOYED ADDRESS>
```

#### Setting up Metamask

If you haven't already, install [Metamask](https://metamask.io/) and then login to your `local test network` (i.e `http://127.0.0.1:8545`).

Then copy the first set of `private key` present in the list of local test node created above.
Then open metamask then click on `Import Account` and paste the `private key` there.

#### Running the frontend

After all the contracts are deployed, we can run the frontend using the following command:

```sh
npm run dev
```

### Deploying the Contracts on Ropsten Test Network

#### Configure the .env file

Create a new test account to host the contract.

Then change the network to `Ropsten Test Network` in `Metamask`.

Create an account in [Infura](https://infura.io/).
Then create an project there.

Copy the `Infura Project ID` and Accounts `Private ID` and add it to `.env` file as:

```sh
INFURA_PROJECT_ID= <Infura Project ID >
ACCOUNT_PRIVATE_KEY= <Account Private ID>
```

#### Adding ethers to ropsten test account

To host contracts on ropsten test network, we need to add ethers to the test account.
Test Ethers can be added by using any of the following websites, just paste the `public id` of the account.

- [https://faucet.ropsten.be/](https://faucet.ropsten.be/)
- [https://faucet.dimensions.network/](https://faucet.dimensions.network/)
- [https://faucet.metamask.io/](https://faucet.metamask.io/)

#### Deploying the contracts

To deploy the contracts to ropsten test network, run the following command:

```sh
npx hardhat run scripts/deploy.js --network ropsten
```

#### Check the deployed smart contracts

You can check the smart contacts deployed on ropsten test network by going to **[Ropsten Etherscan](https://ropsten.etherscan.io/)** and searching for the deployed contract by their id(given in terminal when you deploy the contract).

The current contract is hosted on ropsten test network at the following address:

- `Greeter`: [0xFa8874f93204F7c255f2dff292ed78d0aeEdDDd9](https://ropsten.etherscan.io/address/0xFa8874f93204F7c255f2dff292ed78d0aeEdDDd9)
- `Token`: [0x0eCc6cBF9D47de034c9cC5e96AE51c05A8B8136a](https://ropsten.etherscan.io/address/0x0eCc6cBF9D47de034c9cC5e96AE51c05A8B8136a)
