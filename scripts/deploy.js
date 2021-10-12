/* eslint-disable @typescript-eslint/no-var-requires */
const hre = require('hardhat');

async function main() {
    const Greeter = await hre.ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, World!');

    await greeter.deployed();

    console.log('Greeter deployed to:', greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
