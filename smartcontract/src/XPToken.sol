// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title XPToken
/// @notice Simple ERC20 token for XP; `MINTER_ROLE` can mint tokens (GameCore contract)
contract XPToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        _grantRole(0x00, msg.sender); // DEFAULT_ADMIN_ROLE = 0x00
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 0; // XP as integer units (no decimals)
    }
}
