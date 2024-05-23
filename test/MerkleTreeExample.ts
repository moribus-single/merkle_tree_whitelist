import { expect } from "chai";
import hre from "hardhat";
import MerkleTree from "merkletreejs";

import { buildMerkleTree, getAddresses, getProofsForAddress } from "../scripts";
import { MerkleTreeWhitelistExample } from "../typechain-types/contracts/MerkleTreeExample.sol";

describe("Example of using Merkle Tree off-chain to store whitelist addresses", function () {
  let whitelistMerkleTree: MerkleTree;
  let whitelistRoot: string;

  let exampleContract: MerkleTreeWhitelistExample
  let whitelistAddresses: string[] = getAddresses();

  before(function () {
    // Initialize Merkle Tree and log execution time
    console.time('merkle');
    whitelistMerkleTree = buildMerkleTree(whitelistAddresses);
    console.timeEnd('merkle');

    // Get Root hash as a HEX string
    whitelistRoot = whitelistMerkleTree.getHexRoot();
  });

  it("Deploy the example contract", async function () {
    exampleContract = await hre.ethers.deployContract("MerkleTreeWhitelistExample", [whitelistRoot]);
    expect(await exampleContract.whitelistRoot()).eq(whitelistRoot);
  });

  whitelistAddresses.forEach(async (addr) => {
    it("Check each address from the whitelist for the eligibility", async function () {
      const proofs = getProofsForAddress(addr, whitelistMerkleTree);
      expect(await exampleContract.isEligible(proofs, addr)).true;
    });
  });

  it("Check scam address provided with correct proofs", async function () {
    const addr = whitelistAddresses[0];
    const scamWallets = await hre.ethers.getSigners();
    const proofs = getProofsForAddress(addr, whitelistMerkleTree);

    scamWallets.forEach(async (scamWallet) => {
      expect(await exampleContract.isEligible(proofs, scamWallet.address)).false;
    });
  });
});
