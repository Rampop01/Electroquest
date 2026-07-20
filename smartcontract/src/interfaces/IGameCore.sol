// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGameCore {
    function claimProgress(address user, uint256 questId, uint256 progressValue, uint256 xp, uint256 nonce, uint256 expiry, bytes calldata signature) external;
    function mintChapter(uint256 chapterId) external returns (uint256);
}
