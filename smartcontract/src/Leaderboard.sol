// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

enum QuestType {
    ETHEREUM,
    ELECTRONEUM
}

contract Leaderboard is AccessControl {
    bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");

    struct PlayerStats {
        uint256 totalXP;
        uint256 ethereumXP;
        uint256 electroneumXP;
        uint256 lastUpdateTime;
    }

    mapping(address => PlayerStats) public playerStats;
    address[] public players;
    mapping(address => bool) public isPlayerRegistered;

    // Events
    event ScoreUpdated(
        address indexed player,
        uint8 indexed questType,
        uint256 indexed questId,
        uint256 xpEarned,
        uint256 newTotalXP
    );

    event LeaderboardUpdated(address indexed player, uint256 newRank, uint256 totalXP);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Update a player's score after quest completion
     * @param player Address of the player
     * @param xpEarned Amount of XP earned for this quest
     * @param questType Type of quest (0 = ETHEREUM, 1 = ELECTRONEUM)
     * @param questId ID of the completed quest
     */
    function updateScore(
        address player,
        uint256 xpEarned,
        uint8 questType,
        uint256 questId
    ) external onlyRole(GAME_ROLE) {
        // Register player if not already registered
        if (!isPlayerRegistered[player]) {
            players.push(player);
            isPlayerRegistered[player] = true;
        }

        PlayerStats storage stats = playerStats[player];
        stats.totalXP += xpEarned;
        stats.lastUpdateTime = block.timestamp;

        // Update quest type specific XP
        if (questType == uint8(QuestType.ETHEREUM)) {
            stats.ethereumXP += xpEarned;
        } else if (questType == uint8(QuestType.ELECTRONEUM)) {
            stats.electroneumXP += xpEarned;
        }

        emit ScoreUpdated(player, questType, questId, xpEarned, stats.totalXP);
        emit LeaderboardUpdated(player, getPlayerRank(player), stats.totalXP);
    }

    /**
     * @notice Get total XP for a player
     * @param player Address of the player
     * @return totalXP Total XP accumulated by the player
     */
    function getPlayerTotalXP(address player) external view returns (uint256 totalXP) {
        return playerStats[player].totalXP;
    }

    /**
     * @notice Get XP for a specific quest type
     * @param player Address of the player
     * @param questType Type of quest to check
     * @return questTypeXP XP earned for the specific quest type
     */
    function getPlayerQuestTypeXP(address player, uint8 questType) external view returns (uint256 questTypeXP) {
        if (questType == uint8(QuestType.ETHEREUM)) {
            return playerStats[player].ethereumXP;
        } else if (questType == uint8(QuestType.ELECTRONEUM)) {
            return playerStats[player].electroneumXP;
        }
        return 0;
    }

    /**
     * @notice Get top players globally
     * @param limit Maximum number of players to return
     * @return playerAddresses Array of player addresses
     * @return scores Array of corresponding total XP scores
     */
    function getTopPlayers(uint256 limit) external view returns (address[] memory playerAddresses, uint256[] memory scores) {
        uint256 length = players.length;
        if (limit > length) limit = length;

        // Create arrays for sorting
        address[] memory sortedPlayers = new address[](length);
        uint256[] memory sortedScores = new uint256[](length);

        // Copy data
        for (uint256 i = 0; i < length; i++) {
            sortedPlayers[i] = players[i];
            sortedScores[i] = playerStats[players[i]].totalXP;
        }

        // Simple bubble sort (not efficient for large datasets, but works for demo)
        for (uint256 i = 0; i < length - 1; i++) {
            for (uint256 j = 0; j < length - i - 1; j++) {
                if (sortedScores[j] < sortedScores[j + 1]) {
                    // Swap scores
                    uint256 tempScore = sortedScores[j];
                    sortedScores[j] = sortedScores[j + 1];
                    sortedScores[j + 1] = tempScore;

                    // Swap players
                    address tempPlayer = sortedPlayers[j];
                    sortedPlayers[j] = sortedPlayers[j + 1];
                    sortedPlayers[j + 1] = tempPlayer;
                }
            }
        }

        // Return top players
        playerAddresses = new address[](limit);
        scores = new uint256[](limit);

        for (uint256 i = 0; i < limit; i++) {
            playerAddresses[i] = sortedPlayers[i];
            scores[i] = sortedScores[i];
        }

        return (playerAddresses, scores);
    }

    /**
     * @notice Get player's rank globally
     * @param player Address of the player
     * @return rank Player's position in global leaderboard (1-indexed, 0 if not ranked)
     */
    function getPlayerRank(address player) public view returns (uint256 rank) {
        uint256 playerScore = playerStats[player].totalXP;
        if (playerScore == 0) return 0;

        uint256 betterPlayers = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (playerStats[players[i]].totalXP > playerScore) {
                betterPlayers++;
            }
        }

        return betterPlayers + 1;
    }

    /**
     * @notice Get total number of ranked players
     * @return count Total number of players with XP > 0
     */
    function getTotalPlayers() external view returns (uint256 count) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (playerStats[players[i]].totalXP > 0) {
                activeCount++;
            }
        }
        return activeCount;
    }

    /**
     * @notice Get detailed player statistics
     * @param player Address of the player
     * @return totalXP Total XP across all quest types
     * @return ethereumXP XP earned from Ethereum quests
     * @return electroneumXP XP earned from Electroneum quests
     * @return globalRank Player's global rank
     */
    function getPlayerStats(address player) external view returns (
        uint256 totalXP,
        uint256 ethereumXP,
        uint256 electroneumXP,
        uint256 globalRank
    ) {
        PlayerStats memory stats = playerStats[player];
        return (
            stats.totalXP,
            stats.ethereumXP,
            stats.electroneumXP,
            getPlayerRank(player)
        );
    }

    /**
     * @notice Set the game contract address that can update scores
     * @param gameContract Address of the GameCore contract
     */
    function setGameContract(address gameContract) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(GAME_ROLE, gameContract);
    }

    /**
     * @notice Remove game contract role
     * @param gameContract Address to remove game role from
     */
    function removeGameContract(address gameContract) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(GAME_ROLE, gameContract);
    }

    /**
     * @notice Get leaderboard data in format expected by frontend
     * @param users Array of user addresses
     * @param scores Array of corresponding scores  
     * @param ranks Array of corresponding ranks
     */
    function getLeaderboard() external view returns (
        address[] memory users,
        uint256[] memory scores,
        uint256[] memory ranks
    ) {
        uint256 activeCount = 0;
        
        // Count active players (with XP > 0)
        for (uint256 i = 0; i < players.length; i++) {
            if (playerStats[players[i]].totalXP > 0) {
                activeCount++;
            }
        }

        if (activeCount == 0) {
            return (new address[](0), new uint256[](0), new uint256[](0));
        }

        // Create arrays for active players
        address[] memory activePlayers = new address[](activeCount);
        uint256[] memory activeScores = new uint256[](activeCount);
        
        uint256 index = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (playerStats[players[i]].totalXP > 0) {
                activePlayers[index] = players[i];
                activeScores[index] = playerStats[players[i]].totalXP;
                index++;
            }
        }

        // Sort by score (bubble sort - simple for small datasets)
        for (uint256 i = 0; i < activeCount - 1; i++) {
            for (uint256 j = 0; j < activeCount - i - 1; j++) {
                if (activeScores[j] < activeScores[j + 1]) {
                    // Swap scores
                    uint256 tempScore = activeScores[j];
                    activeScores[j] = activeScores[j + 1];
                    activeScores[j + 1] = tempScore;

                    // Swap players
                    address tempPlayer = activePlayers[j];
                    activePlayers[j] = activePlayers[j + 1];
                    activePlayers[j + 1] = tempPlayer;
                }
            }
        }

        // Create ranks (1-indexed)
        uint256[] memory playerRanks = new uint256[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            playerRanks[i] = i + 1;
        }

        return (activePlayers, activeScores, playerRanks);
    }
}