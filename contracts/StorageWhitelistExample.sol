// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract StorageWhitelistExample {
    mapping(address => bool) private _whitelist;

    function addToWhitelist(address[] memory whitelist) external {
        for (uint256 i; i < whitelist.length; i++) {
            _whitelist[whitelist[i]] = true;
        }
    }

    function isEligible(address account) external view returns (bool) {
        return _whitelist[account];
    }
}
