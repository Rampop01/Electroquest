import { useReadContract, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESSES, QuestType } from '@/constants/contracts'
import { gameCoreABI, leaderboardABI } from '@/lib/abis'

// GameCore contract hooks
export function useQuestProgress(user: `0x${string}` | undefined, questType: QuestType, questId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'getQuestProgress',
    args: [user!, questType, BigInt(questId)],
    query: {
      enabled: !!user,
    },
  })
}

export function useIsQuestCompleted(user: `0x${string}` | undefined, questId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'isCompleted',
    args: [user!, BigInt(questId)],
    query: {
      enabled: !!user,
    },
  })
}

export function useUserTotalXP(user: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'getUserTotalXP',
    args: [user!],
    query: {
      enabled: !!user,
    },
  })
}

export function useUserCompletedQuests(user: `0x${string}` | undefined, questType: QuestType) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'getUserCompletedQuests',
    args: [user!, questType],
    query: {
      enabled: !!user,
    },
  })
}

export function useCalculateReward(baseReward: number, quizScore: number, timeTaken: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'calculateReward',
    args: [BigInt(baseReward), BigInt(quizScore), BigInt(timeTaken)],
  })
}

export function useIsChapterCompleted(user: `0x${string}` | undefined, questType: QuestType, chapterId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
    abi: gameCoreABI,
    functionName: 'isChapterCompleted',
    args: [user!, questType, BigInt(chapterId)],
    query: {
      enabled: !!user,
    },
  })
}

export function useClaimProgress() {
  return useWriteContract()
}

// Leaderboard contract hooks
export function useLeaderboard() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getLeaderboard',
  })
}

export function usePlayerStats(user: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getPlayerStats',
    args: [user!],
    query: {
      enabled: !!user,
    },
  })
}

export function usePlayerTotalXP(user: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getPlayerTotalXP',
    args: [user!],
    query: {
      enabled: !!user,
    },
  })
}

export function usePlayerRank(user: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getPlayerRank',
    args: [user!],
    query: {
      enabled: !!user,
    },
  })
}

export function useTopPlayers(limit: number = 10) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getTopPlayers',
    args: [BigInt(limit)],
  })
}

export function useTotalPlayers() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.ELECTRONEUM.LEADERBOARD,
    abi: leaderboardABI,
    functionName: 'getTotalPlayers',
  })
}