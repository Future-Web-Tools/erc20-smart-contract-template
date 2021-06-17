
# Future Web's ERC20 token contract template
This repo is a starter template that makes it easy to spin an ERC20 token smart contract up quickly and securely. It is developed by [Future Web](http://futureweb.tools).

While the examples specified here are for Ethereum, Binance Smart Chain and the KuCoin Chain, this template can be used for any EVM based blockchain by customizing the `.env.json` file, as described below.

## Features
- **Pausability:** contract can be frozen
- **Burnability:** tokens can be burned
- **Management:** contract can have multiple admins who can be added or removed by existing admins
- **Standard tooling**: uses the latest dev tooling: Open Zeppelin, Solidity 0.8, Hardhat, solhint, lint, prettier, husky
- **Tests:** testing setup
- **Tooling setup:** prettier and linting
- **Verifiability:** EtherScan/BSC Scan verification setup

## Getting started
- Clone this repo
- Setup your `.env.json` file in the the root folder of the project
- Open `contracts/Token.sol` and edit these 3 placeholders: `TOKEN_NAME_HERE`, `TOKEN_SYMBOL_HERE`, `TOKEN_HARD_CAP_AMOUNT_HERE`
- Customize as needed - but remember to add tests for customization introduced
- Run `npm run test` to ensure tests are passing
- Run `npm run deploy:staging` to deploy to public **testnet for staging**
- Run `npm run deploy:mainnet` to deploy to public **mainnet for production**

## Available npm commands
- `npm run test`: run test
- `npm run compile`: run contract compile
- `npm run coverage`: run test coverage
- `npm run lint:contract`: run link on contracts
- `npm run lint:test`: run lint-fix on JS files in `/test` folder
- `npm run lint:scripts`: run lint-fix on everything in `/scripts` folder
- `npm run lint:config`: run lint-fix on `./hardhat.config.js`, `.solcover.js` and `.eslintrc.js`
- `npm run lint`: run all lints
- `npm run prettier`: run prettier on contracts
- `npm run pre`: run prettier on contracts && lint contracts
- `npm run confirm`: run all linting && run test
- `npm run deploy:staging`: deploy contract to public testnet
- `npm run deploy:mainnet`: deploy contract to public mainnet
- `npm run size`: print contract sizes to console

## Verify deployed contract

The following commands will verify your token contract on EtherScan(Ethereum) and BSC Scan(Binance Smart Chain).

- Run `npx hardhat verify --network staging DEPLOYED_CONTRACT_ADDRESS` to verify for staging(testnet)
- Run `npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS` to verify for mainnet

Remember to replace `DEPLOYED_CONTRACT_ADDRESS` with the actual address of the contract - displayed in your console after running the deploy command.

For KuCoin Chain, go to [KuCoin Verify](https://explorer.kcc.io/en/verifyContract).

## Chain configurations
This is how to setup your `.env.json` for EVM networks. You can use the same approach for other EVM chains not specified here. 

Remember to edit the `GAS_PRICE` field as appropriate.

### Using with Ethereum

```json
{
  "EXPLORER_API_KEY": "EtherScan API",
  "STAGING_CONFIG": {
    "RPC_ENDPOINT": "Infura or Alchemy Ethereum Ropsten testnet API",
    "CHAIN_ID": 3,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  },
  "PRODUCTION_CONFIG": {
    "RPC_ENDPOINT": "Infura or Alchemy Ethereum mainnet API",
    "CHAIN_ID": 1,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  }
}
```

### Using with Binance Smart Chain

```json
{
  "EXPLORER_API_KEY": "BSC Scan API",
  "STAGING_CONFIG": {
    "RPC_ENDPOINT": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "CHAIN_ID": 97,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  },
  "PRODUCTION_CONFIG": {
    "RPC_ENDPOINT": "https://bsc-dataseed.binance.org/",
    "CHAIN_ID": 56,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  }
}
```

### Using with KuCoin Chain

```json
{
  "EXPLORER_API_KEY": "XXXXXXXXXXXXXXXXX",
  "STAGING_CONFIG": {
    "RPC_ENDPOINT": "https://rpc-testnet.kcc.network",
    "CHAIN_ID": 322,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  },
  "PRODUCTION_CONFIG": {
    "RPC_ENDPOINT": "https://rpc-mainnet.kcc.network",
    "CHAIN_ID": 321,
    "GAS_PRICE": 20000000000,
    "PRIVATE_KEY": "Deployment private key"
  }
}
```

### Other EVM chains

Replace `XXXXXXXXXXXXXXXXX` with the appropriate values.

```json
{
  "EXPLORER_API_KEY": "XXXXXXXXXXXXXXXXX",
  "STAGING_CONFIG": {
    "RPC_ENDPOINT": "XXXXXXXXXXXXXXXXX",
    "CHAIN_ID": "XXXXXXXXXXXXXXXXX",
    "GAS_PRICE": "XXXXXXXXXXXXXXXXX",
    "PRIVATE_KEY": "XXXXXXXXXXXXXXXXX"
  },
  "PRODUCTION_CONFIG": {
    "RPC_ENDPOINT": "XXXXXXXXXXXXXXXXX",
    "CHAIN_ID": "XXXXXXXXXXXXXXXXX",
    "GAS_PRICE": "XXXXXXXXXXXXXXXXX",
    "PRIVATE_KEY": "XXXXXXXXXXXXXXXXX"
  }
}
```

## Learn more
Visit [Future Web](http://futureweb.tools) to learn more.
