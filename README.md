# Ethereum DAPP Demo

This project demonstrates a basic DAPP using on the [Ethereum blockchain](https://ethereum.org/), this project is developed using [Hardhat](https://hardhat.org/), [EtherJS](https://docs.ethers.io/v5/) and frontend in [NextJS](https://nextjs.org/).

## Getting Started

Prerequisites:

- [NodeJS](https://nodejs.org/en/)
- [Metamask](https://metamask.io/)

### Cloning the project

Clone the project using the following command:

_(With github CLI)_

```sh
gh repo clone VarunSAthreya/etherum_dapp_demo
```

_(Without CLI)_

```sh
git clone https://github.com/VarunSAthreya/etherum_dapp_demo.git
```

### Installing Dependencies

Make sure you have NodeJS is installed for this.

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
