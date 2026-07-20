export const leaderboardABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getLeaderboard",
    "inputs": [],
    "outputs": [
      {"name": "users", "type": "address[]", "internalType": "address[]"},
      {"name": "scores", "type": "uint256[]", "internalType": "uint256[]"},
      {"name": "ranks", "type": "uint256[]", "internalType": "uint256[]"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlayerStats",
    "inputs": [
      {"name": "player", "type": "address", "internalType": "address"}
    ],
    "outputs": [
      {"name": "totalXP", "type": "uint256", "internalType": "uint256"},
      {"name": "ethereumXP", "type": "uint256", "internalType": "uint256"},
      {"name": "celoXP", "type": "uint256", "internalType": "uint256"},
      {"name": "globalRank", "type": "uint256", "internalType": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlayerTotalXP",
    "inputs": [
      {"name": "player", "type": "address", "internalType": "address"}
    ],
    "outputs": [{"name": "totalXP", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlayerRank",
    "inputs": [
      {"name": "player", "type": "address", "internalType": "address"}
    ],
    "outputs": [{"name": "rank", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTopPlayers",
    "inputs": [
      {"name": "limit", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [
      {"name": "playerAddresses", "type": "address[]", "internalType": "address[]"},
      {"name": "scores", "type": "uint256[]", "internalType": "uint256[]"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalPlayers",
    "inputs": [],
    "outputs": [{"name": "count", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateScore",
    "inputs": [
      {"name": "player", "type": "address", "internalType": "address"},
      {"name": "xpEarned", "type": "uint256", "internalType": "uint256"},
      {"name": "questType", "type": "uint8", "internalType": "uint8"},
      {"name": "questId", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ScoreUpdated",
    "inputs": [
      {"name": "player", "type": "address", "indexed": true, "internalType": "address"},
      {"name": "questType", "type": "uint8", "indexed": true, "internalType": "uint8"},
      {"name": "questId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "xpEarned", "type": "uint256", "indexed": false, "internalType": "uint256"},
      {"name": "newTotalXP", "type": "uint256", "indexed": false, "internalType": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LeaderboardUpdated",
    "inputs": [
      {"name": "player", "type": "address", "indexed": true, "internalType": "address"},
      {"name": "newRank", "type": "uint256", "indexed": false, "internalType": "uint256"},
      {"name": "totalXP", "type": "uint256", "indexed": false, "internalType": "uint256"}
    ],
    "anonymous": false
  }
] as const;