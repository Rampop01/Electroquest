// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

interface IXPToken {
    function mint(address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

interface IChapterNFT {
    function mint(address to, uint256 tokenId) external returns (uint256);
}

interface ILeaderboard {
    function updateScore(address player, uint256 xpEarned, uint8 questType, uint256 questId) external;
}

enum QuestType {
    ETHEREUM,
    ELECTRONEUM
}

/// @title GameCore
/// @notice Enhanced game contract with quest type separation, quiz tracking, and advanced rewards
contract GameCore is EIP712, AccessControl {
    using ECDSA for bytes32;

    bytes32 public constant ADMIN_ROLE = DEFAULT_ADMIN_ROLE;

    // Enhanced quest completion data
    struct QuestCompletion {
        bool completed;             // whether quest is completed
        uint256 quizScore;          // 0-100 (quiz score percentage)
        uint256 timeTaken;          // seconds spent on quest
        uint256 timestamp;          // when quest was completed
    }

    IXPToken public xpToken;
    IChapterNFT public chapterNft;
    ILeaderboard public leaderboard;

    // domain name, version for EIP-712
    string private constant NAME = "QuestEthGame";
    string private constant VERSION = "1";

    // Enhanced progress mapping: questType => user => questId => QuestCompletion
    mapping(QuestType => mapping(address => mapping(uint256 => QuestCompletion))) public playerProgress;
    
    // Quest to chapter mapping for NFT rewards
    mapping(QuestType => mapping(uint256 => uint256)) public questToChapter;

    // nonces used per user
    mapping(address => mapping(uint256 => bool)) public usedNonces;

    address public rewardSigner;

    // Bonus multipliers (basis points, 10000 = 100%)
    uint256 public perfectScoreBonus = 5000;  // 50% bonus for perfect quiz score
    uint256 public speedBonusThreshold = 300; // 5 minutes
    uint256 public speedBonusMultiplier = 2000; // 20% bonus for fast completion

    event ProgressClaimed(
        address indexed user, 
        QuestType indexed questType,
        uint256 indexed questId, 
        uint256 xpAwarded,
        uint256 quizScore
    );
    
    event ChapterCompleted(
        address indexed user, 
        QuestType indexed questType,
        uint256 indexed chapterId, 
        uint256 tokenId
    );

    // Enhanced EIP-712 typehash with new fields
    bytes32 public constant PROGRESS_TYPEHASH = keccak256(
        "Progress(address user,uint8 questType,uint256 questId,uint256 quizScore,uint256 timeTaken,uint256 xp,uint256 nonce,uint256 expiry)"
    );

    constructor(address xpToken_, address chapterNft_, address signer_) EIP712(NAME, VERSION) {
        xpToken = IXPToken(xpToken_);
        chapterNft = IChapterNFT(chapterNft_);
        rewardSigner = signer_;
        _grantRole(ADMIN_ROLE, msg.sender);
        
        // Initialize default quest-to-chapter mappings
        // Ethereum quests: 1-3 = chapter 1, 4-6 = chapter 2, etc.
        _setQuestToChapterMapping(QuestType.ETHEREUM, 1, 1);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 2, 1);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 3, 1);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 4, 2);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 5, 2);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 6, 2);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 7, 3);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 8, 3);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 9, 3);
        _setQuestToChapterMapping(QuestType.ETHEREUM, 10, 4);
        
        // Electroneum quests: 1-3 = chapter 5, 4-6 = chapter 6, etc.
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 1, 5);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 2, 5);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 3, 5);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 4, 6);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 5, 6);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 6, 6);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 7, 7);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 8, 7);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 9, 7);
        _setQuestToChapterMapping(QuestType.ELECTRONEUM, 10, 8);
    }

    function _setQuestToChapterMapping(QuestType questType, uint256 questId, uint256 chapterId) internal {
        questToChapter[questType][questId] = chapterId;
    }

    function setRewardSigner(address s) external onlyRole(ADMIN_ROLE) {
        rewardSigner = s;
    }

    function setXPToken(address t) external onlyRole(ADMIN_ROLE) {
        xpToken = IXPToken(t);
    }

    function setChapterNFT(address n) external onlyRole(ADMIN_ROLE) {
        chapterNft = IChapterNFT(n);
    }

    function setLeaderboard(address l) external onlyRole(ADMIN_ROLE) {
        leaderboard = ILeaderboard(l);
    }

    function setBonusParameters(
        uint256 _perfectScoreBonus,
        uint256 _speedBonusThreshold,
        uint256 _speedBonusMultiplier
    ) external onlyRole(ADMIN_ROLE) {
        perfectScoreBonus = _perfectScoreBonus;
        speedBonusThreshold = _speedBonusThreshold;
        speedBonusMultiplier = _speedBonusMultiplier;
    }

    function setQuestToChapter(
        QuestType questType,
        uint256 questId,
        uint256 chapterId
    ) external onlyRole(ADMIN_ROLE) {
        questToChapter[questType][questId] = chapterId;
    }

    /// @notice Claim progress for a specific quest type with quiz scoring
    function claimProgress(
        QuestType questType,
        uint256 questId,
        uint256 quizScore,
        uint256 timeTaken,
        uint256 xp,
        uint256 nonce,
        uint256 expiry,
        bytes calldata signature
    ) external {
        require(block.timestamp <= expiry, "Voucher expired");
        require(!usedNonces[msg.sender][nonce], "Nonce used");
        require(questToChapter[questType][questId] > 0, "Invalid quest mapping");

        bytes32 structHash = keccak256(abi.encode(PROGRESS_TYPEHASH, msg.sender, uint256(questType), questId, quizScore, timeTaken, xp, nonce, expiry));
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(hash, signature);
        require(signer == rewardSigner, "Invalid signer");

        usedNonces[msg.sender][nonce] = true;

        // Check if quest already completed
        require(!playerProgress[questType][msg.sender][questId].completed, "Quest already completed");

        // Store quest completion details
        playerProgress[questType][msg.sender][questId] = QuestCompletion({
            completed: true,
            quizScore: quizScore,
            timeTaken: timeTaken,
            timestamp: block.timestamp
        });

        // Calculate rewards based on performance
        uint256 totalReward = calculateReward(xp, quizScore, timeTaken);

        // Mint XP tokens
        xpToken.mint(msg.sender, totalReward);

        // Check if all quests for this chapter are completed
        uint256 chapterId = questToChapter[questType][questId];
        if (_isChapterComplete(msg.sender, questType, chapterId)) {
            chapterNft.mint(msg.sender, chapterId);
        }

        // Update leaderboard if available
        if (address(leaderboard) != address(0)) {
            leaderboard.updateScore(msg.sender, totalReward, uint8(questType), questId);
        }

        emit ProgressClaimed(msg.sender, questType, questId, totalReward, quizScore);
    }

    /// @notice Calculate reward based on quiz score and completion time
    function calculateReward(uint256 baseReward, uint256 quizScore, uint256 timeTaken) public view returns (uint256) {
        uint256 totalReward = baseReward;

        // Perfect score bonus (100% quiz score)
        if (quizScore >= 100) {
            totalReward = totalReward * (100 + perfectScoreBonus) / 100;
        }

        // Speed bonus if completed under threshold
        if (timeTaken > 0 && timeTaken <= speedBonusThreshold) {
            totalReward = totalReward * (100 + speedBonusMultiplier) / 100;
        }

        return totalReward;
    }

    /// @notice Check if all quests in a chapter are completed
    function _isChapterComplete(address user, QuestType questType, uint256 chapterId) internal view returns (bool) {
        // Count completed quests for this chapter
        uint256 completedQuests = 0;
        uint256 totalQuests = 0;

        // Check all possible quest IDs (assuming 10 quests per type)
        for (uint256 i = 1; i <= 10; i++) {
            if (questToChapter[questType][i] == chapterId) {
                totalQuests++;
                if (playerProgress[questType][user][i].completed) {
                    completedQuests++;
                }
            }
        }

        return totalQuests > 0 && completedQuests == totalQuests;
    }

    /// @notice Get quest completion details for a user
    function getQuestProgress(
        address user,
        QuestType questType,
        uint256 questId
    ) external view returns (QuestCompletion memory) {
        return playerProgress[questType][user][questId];
    }

    /// @notice Get all completed quests for a user and quest type
    function getUserCompletedQuests(
        address user,
        QuestType questType
    ) external view returns (uint256[] memory) {
        uint256[] memory completedQuests = new uint256[](10); // Max 10 quests per type
        uint256 count = 0;

        for (uint256 i = 1; i <= 10; i++) {
            if (playerProgress[questType][user][i].completed) {
                completedQuests[count] = i;
                count++;
            }
        }

        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = completedQuests[i];
        }

        return result;
    }

    /// @notice Get chapter completion status for a user
    function isChapterCompleted(
        address user,
        QuestType questType,
        uint256 chapterId
    ) external view returns (bool) {
        return _isChapterComplete(user, questType, chapterId);
    }

    /// @notice Get total XP earned by a user
    function getUserTotalXP(address user) external view returns (uint256) {
        return xpToken.balanceOf(user);
    }

    /// @notice Legacy function for backward compatibility
    function getProgress(address user, uint256 questId) external view returns (uint256) {
        // Return legacy progress format (0-100)
        if (playerProgress[QuestType.ETHEREUM][user][questId].completed) {
            return 100;
        }
        if (playerProgress[QuestType.ELECTRONEUM][user][questId].completed) {
            return 100;
        }
        return 0;
    }

    /// @notice Legacy function for backward compatibility
    function isCompleted(address user, uint256 questId) external view returns (bool) {
        return playerProgress[QuestType.ETHEREUM][user][questId].completed || 
               playerProgress[QuestType.ELECTRONEUM][user][questId].completed;
    }
}
