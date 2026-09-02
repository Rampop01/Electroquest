// Smart Contract Addresses on Electroneum Network
export const CONTRACT_ADDRESSES = {
  // Electroneum Mainnet (Chain ID: 52014)
  ELECTRONEUM: {
    XP_TOKEN: '0x772100f3518A6f0498f83F6a3f0248c0d59b7c2C' as `0x${string}`,
    CHAPTER_NFT: '0x507D08C137ca6A3e10462Db241dc93e92aDB53aB' as `0x${string}`,
    LEADERBOARD: '0x3eC3AAb4d8Ed3C324F5Fe49Ec6872357cdeB1bD6' as `0x${string}`,
    GAME_CORE: '0xbF4b47E05f0f94e9C264847C1B93f26829dEe4bF' as `0x${string}`,
    REWARD_SIGNER: '0xb216270aFB9DfcD611AFAf785cEB38250863F2C9' as `0x${string}`,
  }
} as const;

// Electroneum Network Configurations
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

export const ELECTRONEUM_TESTNET = {
  id: 5201420,
  name: 'Electroneum Testnet',
  network: 'electroneum-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Electroneum',
    symbol: 'ETN',
  },
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/electroneum_testnet'] },
    default: { http: ['https://rpc.ankr.com/electroneum_testnet'] },
  },
  blockExplorers: {
    default: { name: 'Electroneum Testnet Explorer', url: 'https://testnet-blockexplorer.electroneum.com' },
  },
} as const;

export const SUPPORTED_CHAIN_IDS = [ELECTRONEUM_NETWORK.id, ELECTRONEUM_TESTNET.id] as const;

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