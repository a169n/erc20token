# ERC20 Token

This repository contains a Solidity smart contract for an ERC20 token. The ERC20 standard is a widely adopted standard for fungible tokens on the Ethereum blockchain.

## Overview

The ERC20Token contract implements the ERC20 standard interface with additional functionalities such as minting, burning, and allowance management. It allows users to create, transfer, and manage tokens within the Ethereum ecosystem.

## Features

- ERC20 standard compliance
- Token creation and transfer
- Minting new tokens
- Burning existing tokens
- Allowing token transfers on behalf of other addresses

## Usage

1. Clone the repository:
```
git clone https://github.com/your-username/erc20-token.git
```

2. Install dependencies:
```
npm install
```

3. Compile the contract:
```
npx hardhat compile
```

4. Deploy the contract to a network:
```
npx hardhat run scripts/deploy.js --network NETWORK_NAME
```

Replace `NETWORK_NAME` with the desired network (e.g., `rinkeby`, `ropsten`, `mainnet`).
In out case it is **Sepolia**

## Configuration

- Solidity version: 0.8.24
- Hardhat version: 2.0.10
- Dependencies: @nomiclabs/hardhat-ethers, dotenv, ethers

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is not licensed.


