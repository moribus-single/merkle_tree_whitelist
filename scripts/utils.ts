import MerkleTree from "merkletreejs"
import keccak256 from "keccak256";
import "dotenv/config"

import addresses from "../whitelist_data.json";

/**
 * Read addresses from the file with addresses
 * 
 * @returns Array of addresses
 */
export function getAddresses(): string[] {
    return addresses;
}

/**
 * Create and return MerkleTree object for provided addresses
 * 
 * @param addresses Addresses that will be used to build a Merkle Tree
 * @returns 
 */
export function buildMerkleTree(addresses: string[]): MerkleTree {
    // Create array of leafs where each one is keccak256(address)
    const leaves = addresses.map(addr => keccak256(addr));

    // Initialize MerkleTree object and return it
    return new MerkleTree(leaves, keccak256, { sortPairs: true })
}

/**
 * Get array of proofs for provided address in specified Merkle tree
 * @param address Address for which proofs returned
 * @param tree MerkleTree object
 * @returns Array of proofs for provided address
 */
export function getProofsForAddress(address: string, tree: MerkleTree): string[] {
    return tree.getHexProof(keccak256(address))
}
