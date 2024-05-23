import { expect } from "chai";
import hre from "hardhat";

import { getAddresses } from "../scripts";
import { StorageWhitelistExample } from "../typechain-types/contracts/StorageWhitelistExample";


describe("Example of using storage memory to store whitelist addresses", function () {
    let exampleContract: StorageWhitelistExample
    let whitelistAddresses: string[] = getAddresses();
    let scamAddresses: string[];

    before(async function () {
        exampleContract = await hre.ethers.deployContract("StorageWhitelistExample", []);

        // Get scam addresses
        const signers = await hre.ethers.getSigners();
        scamAddresses = signers.map(signer => signer.address);
    });

    it("Set whitelist addresses", async function () {
        await exampleContract.addToWhitelist(whitelistAddresses);
    });

    whitelistAddresses.forEach(async (addr) => {
        it("Check each address from the whitelist for the eligibility", async function () {
            expect(await exampleContract.isEligible(addr)).true;
        });
    });


    it("Check scam addresses", async function () {
        scamAddresses.forEach(async (addr) => {
            expect(await exampleContract.isEligible(addr)).false;
        });
    });

});