import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { buildMerkleTree, getAddresses } from "../../scripts";

const tree = buildMerkleTree(getAddresses())
const root = tree.getHexRoot();

const ExampleModule = buildModule("ExampleModule", (m) => {
  const example = m.contract("MerkleTreeWhitelistExample", [root]);

  return { example };
});

export default ExampleModule;
