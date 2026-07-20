// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title ChapterNFT
/// @notice ERC721 contract for Chapter completion NFTs. `MINTER_ROLE` allowed to mint.
contract ChapterNFT is ERC721, AccessControl {
    uint256 private _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string public baseURI;

    constructor(string memory name_, string memory symbol_, string memory baseURI_) ERC721(name_, symbol_) {
        _grantRole(0x00, msg.sender); // DEFAULT_ADMIN_ROLE = 0x00
        baseURI = baseURI_;
        _tokenIdCounter = 1; // Start from token ID 1
    }

    function setBaseURI(string calldata uri) external onlyRole(0x00) {
        baseURI = uri;
    }

    function mint(address to, uint256 /* tokenId */) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tid = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tid);
        return tid;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked(baseURI, _toString(tokenId)));
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        // OpenZeppelin's toString is in Strings library; keep minimal here to avoid extra import
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
