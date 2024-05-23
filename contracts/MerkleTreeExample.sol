// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeWhitelistExample {
    // Merkle Tree Root
    bytes32 public whitelistRoot;

    constructor(bytes32 _root) {
        // Initialize root calculated off-chain
        whitelistRoot = _root;
    }

    /**
     * Check eligibility of provided address using proofs from whitelist merkle tree
     *
     * @param proofs Array of nodes(leaves) to prove account in Whitelist
     * @param account Address which we want to check for eligibility
     */
    function isEligible(
        bytes32[] memory proofs,
        address account
    ) external view returns (bool) {
        return
            MerkleProof.verify(
                proofs,
                whitelistRoot,
                keccak256(abi.encodePacked(account))
            );
    }
}
