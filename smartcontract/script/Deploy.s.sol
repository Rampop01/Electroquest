// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {XPToken} from "../src/XPToken.sol";
import {ChapterNFT} from "../src/ChapterNFT.sol";
import {Leaderboard} from "../src/Leaderboard.sol";
import {GameCore} from "../src/GameCore.sol";

contract Deploy is Script {
    // Deployment addresses (will be set after deployment)
    address public xpToken;
    address public chapterNFT;
    address public leaderboard;
    address public gameCore;
    address public rewardSigner;

    // Contract parameters
    string public constant XP_TOKEN_NAME = "QuestEth XP";
    string public constant XP_TOKEN_SYMBOL = "XP";
    string public constant NFT_NAME = "QuestEth Chapter NFT";
    string public constant NFT_SYMBOL = "QECH";
    string public constant NFT_BASE_URI = "https://api.questeth.com/nft/"; // Update with your actual base URI

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        rewardSigner = vm.envAddress("REWARD_SIGNER"); // Address that will sign progress vouchers
        
        vm.startBroadcast(deployerPrivateKey);

        // Step 1: Deploy XPToken
        console.log("Deploying XPToken...");
        XPToken xpTokenContract = new XPToken(XP_TOKEN_NAME, XP_TOKEN_SYMBOL);
        xpToken = address(xpTokenContract);
        console.log("XPToken deployed at:", xpToken);

        // Step 2: Deploy ChapterNFT
        console.log("Deploying ChapterNFT...");
        ChapterNFT chapterNFTContract = new ChapterNFT(
            NFT_NAME,
            NFT_SYMBOL,
            NFT_BASE_URI
        );
        chapterNFT = address(chapterNFTContract);
        console.log("ChapterNFT deployed at:", chapterNFT);

        // Step 3: Deploy Leaderboard
        console.log("Deploying Leaderboard...");
        Leaderboard leaderboardContract = new Leaderboard();
        leaderboard = address(leaderboardContract);
        console.log("Leaderboard deployed at:", leaderboard);

        // Step 4: Deploy GameCore
        console.log("Deploying GameCore...");
        GameCore gameCoreContract = new GameCore(
            xpToken,
            chapterNFT,
            rewardSigner
        );
        gameCore = address(gameCoreContract);
        console.log("GameCore deployed at:", gameCore);

        // Step 5: Configure roles and permissions
        console.log("Configuring roles and permissions...");
        
        // Grant MINTER_ROLE to GameCore for XPToken
        xpTokenContract.grantRole(
            keccak256("MINTER_ROLE"),
            gameCore
        );
        console.log("Granted MINTER_ROLE to GameCore for XPToken");

        // Grant MINTER_ROLE to GameCore for ChapterNFT
        chapterNFTContract.grantRole(
            keccak256("MINTER_ROLE"),
            gameCore
        );
        console.log("Granted MINTER_ROLE to GameCore for ChapterNFT");

        // Grant GAME_ROLE to GameCore for Leaderboard
        leaderboardContract.setGameContract(gameCore);
        console.log("Granted GAME_ROLE to GameCore for Leaderboard");

        // Step 6: Set Leaderboard in GameCore
        gameCoreContract.setLeaderboard(leaderboard);
        console.log("Set Leaderboard address in GameCore");

        vm.stopBroadcast();

        // Print deployment summary
        console.log("\n=== Deployment Summary ===");
        console.log("XPToken:", xpToken);
        console.log("ChapterNFT:", chapterNFT);
        console.log("Leaderboard:", leaderboard);
        console.log("GameCore:", gameCore);
        console.log("Reward Signer:", rewardSigner);
        console.log("Deployer:", msg.sender);
        console.log("========================\n");
    }
}
