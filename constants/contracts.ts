// Smart Contract Addresses on Electroneum Network
export const CONTRACT_ADDRESSES = {
  // Electroneum Mainnet (Chain ID: 52014)
  ELECTRONEUM: {
    XP_TOKEN: '0x40964fe5ad88565a1cc144c567e446efa3464483' as `0x${string}`,
    CHAPTER_NFT: '0x4e703a7f1c21e9ca2236a79ae2ba77d892ba4b75' as `0x${string}`,
    LEADERBOARD: '0x664653fbd55982eba38328f2be408e93280133db' as `0x${string}`,
    GAME_CORE: '0x4119c4b90bbd7b9f598c53a44294fa05fe9f26fd' as `0x${string}`,
    REWARD_SIGNER: '0x99D8fed31b609c1B24cb38094b45E97384Ed9D55' as `0x${string}`,
  }
} as const;

// Electroneum Network Configuration
export const ELECTRONEUM_NETWORK = {
  id: 52014,
  name: 'Electroneum',
  network: 'electroneum',
  nativeCurrency: {
    decimals: 18,
    name: 'Electroneum',
    symbol: 'ETN',
  },
  rpcUrls: {
    public: { http: ['https://rpc.electroneum.com'] },
    default: { http: ['https://rpc.electroneum.com'] },
  },
  blockExplorers: {
    default: { name: 'Electroneum Explorer', url: 'https://blockexplorer.electroneum.com' },
  },
} as const;

// Quest Types Enum (matches smart contract)
export enum QuestType {
  ETHEREUM = 0,
  ELECTRONEUM = 1
}

// Contract Function Names for easy reference
export const CONTRACT_FUNCTIONS = {
  GAME_CORE: {
    CLAIM_PROGRESS: 'claimProgress',
    GET_QUEST_PROGRESS: 'getQuestProgress',
    IS_COMPLETED: 'isCompleted',
    GET_USER_TOTAL_XP: 'getUserTotalXP',
    CALCULATE_REWARD: 'calculateReward',
    IS_CHAPTER_COMPLETED: 'isChapterCompleted',
    GET_USER_COMPLETED_QUESTS: 'getUserCompletedQuests',
  },
  LEADERBOARD: {
    GET_LEADERBOARD: 'getLeaderboard',
    GET_PLAYER_STATS: 'getPlayerStats',
    GET_PLAYER_TOTAL_XP: 'getPlayerTotalXP',
    GET_PLAYER_RANK: 'getPlayerRank',
    GET_TOP_PLAYERS: 'getTopPlayers',
    UPDATE_SCORE: 'updateScore',
  }
} as const;