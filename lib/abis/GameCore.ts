export const gameCoreABI = [
  {
    "type": "constructor",
    "inputs": [
      {"name": "xpToken_", "type": "address", "internalType": "address"},
      {"name": "chapterNft_", "type": "address", "internalType": "address"},
      {"name": "signer_", "type": "address", "internalType": "address"}
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimProgress",
    "inputs": [
      {"name": "questType", "type": "uint8", "internalType": "enum QuestType"},
      {"name": "questId", "type": "uint256", "internalType": "uint256"},
      {"name": "quizScore", "type": "uint256", "internalType": "uint256"},
      {"name": "timeTaken", "type": "uint256", "internalType": "uint256"},
      {"name": "xp", "type": "uint256", "internalType": "uint256"},
      {"name": "nonce", "type": "uint256", "internalType": "uint256"},
      {"name": "expiry", "type": "uint256", "internalType": "uint256"},
      {"name": "signature", "type": "bytes", "internalType": "bytes"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getQuestProgress",
    "inputs": [
      {"name": "user", "type": "address", "internalType": "address"},
      {"name": "questType", "type": "uint8", "internalType": "enum QuestType"},
      {"name": "questId", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct GameCore.QuestCompletion",
        "components": [
          {"name": "completed", "type": "bool", "internalType": "bool"},
          {"name": "quizScore", "type": "uint256", "internalType": "uint256"},
          {"name": "timeTaken", "type": "uint256", "internalType": "uint256"},
          {"name": "timestamp", "type": "uint256", "internalType": "uint256"}
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isCompleted",
    "inputs": [
      {"name": "user", "type": "address", "internalType": "address"},
      {"name": "questId", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserTotalXP",
    "inputs": [
      {"name": "user", "type": "address", "internalType": "address"}
    ],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserCompletedQuests",
    "inputs": [
      {"name": "user", "type": "address", "internalType": "address"},
      {"name": "questType", "type": "uint8", "internalType": "enum QuestType"}
    ],
    "outputs": [{"name": "", "type": "uint256[]", "internalType": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateReward",
    "inputs": [
      {"name": "baseReward", "type": "uint256", "internalType": "uint256"},
      {"name": "quizScore", "type": "uint256", "internalType": "uint256"},
      {"name": "timeTaken", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isChapterCompleted",
    "inputs": [
      {"name": "user", "type": "address", "internalType": "address"},
      {"name": "questType", "type": "uint8", "internalType": "enum QuestType"},
      {"name": "chapterId", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "ProgressClaimed",
    "inputs": [
      {"name": "user", "type": "address", "indexed": true, "internalType": "address"},
      {"name": "questType", "type": "uint8", "indexed": true, "internalType": "enum QuestType"},
      {"name": "questId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "xpAwarded", "type": "uint256", "indexed": false, "internalType": "uint256"},
      {"name": "quizScore", "type": "uint256", "indexed": false, "internalType": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ChapterCompleted",
    "inputs": [
      {"name": "user", "type": "address", "indexed": true, "internalType": "address"},
      {"name": "questType", "type": "uint8", "indexed": true, "internalType": "enum QuestType"},
      {"name": "chapterId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "tokenId", "type": "uint256", "indexed": false, "internalType": "uint256"}
    ],
    "anonymous": false
  }
] as const;