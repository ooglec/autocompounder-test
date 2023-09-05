import { ethers } from "ethers";
import { FactoryContract } from "./index.js";


function createSalt(userAddress, nonce) {
    const salt = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['address', 'uint256'],
        [userAddress, nonce]
      )
    );
    return salt;
  }

async function generateEIP712Signature(wallet, factoryAddress, userAddress, compounderAddress) {
  
  const domain = {
    name: 'PlsAutoCompounderFactory',
    version: '1',
    chainId: 42161,  // arbitrum one chainid
    verifyingContract: factoryAddress,
  };

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    RegisterCompounder: [
      { name: 'user', type: 'address' },
      { name: 'compounder', type: 'address' },
      { name: 'factory', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint48' },
    ],
  };

  const value = {
    user: userAddress,
    compounder: compounderAddress,
    factory: factoryAddress,
    nonce: nonce,
    deadline: Date.now() + 1000,
  };

  const signature = await wallet._signTypedData(domain, { RegisterCompounder: types.RegisterCompounder }, value);
  return signature;
}

const factoryAddress = "0x762C2b5165E57A9B7B843F5B968C11Fe1d2F55Dd"; //store as env var
const privateKey = "0xf655fa3977ab88fd933b51328fe20facb97d54ffd5ea2677c74b13ebc3db37e7"; //store as env var
const wallet = new ethers.Wallet(privateKey);
const userAddress = "0x416abC82b7c8ccB0e124c5CC546818405E64cbBC"; //store as env var
const salt = createSalt(userAddress, 0);
const compounderAddress = FactoryContract.predictDeterministicAddress(userAddress, salt);

generateEIP712Signature(wallet, factoryAddress, userAddress, compounderAddress)
  .then(signature => {
    console.log(`Signature: ${signature}`);
  })
  .catch(error => console.error(error));