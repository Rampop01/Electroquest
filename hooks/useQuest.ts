import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { gameCoreABI } from '@/lib/abis';
import { CONTRACT_ADDRESSES, QuestType } from '@/constants/contracts';

interface ClaimProgressParams {
  questType: QuestType;
  questId: number;
  quizScore: number;
  timeTaken: number;
  xp: number;
}

export function useQuestCompletion() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const claimProgress = async (params: ClaimProgressParams) => {
    if (!address) {
      setMessage('Please connect your wallet to claim progress');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('Submitting quest progress...');
      
      // Fetch the signature from our backend
      const response = await fetch('/api/sign-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: address,
          questType: params.questType,
          questId: params.questId,
          quizScore: params.quizScore,
          timeTaken: params.timeTaken,
          xp: params.xp,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get signature from server');
      }

      const { signature, nonce, expiry } = data;
      
      await writeContract({
        address: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE,
        abi: gameCoreABI,
        functionName: 'claimProgress',
        args: [
          params.questType,
          BigInt(params.questId),
          BigInt(params.quizScore),
          BigInt(params.timeTaken),
          BigInt(params.xp),
          BigInt(nonce),
          BigInt(expiry),
          signature as `0x${string}`
        ],
      });
      
      setMessage('Quest progress submitted! Waiting for confirmation...');
    } catch (err: any) {
      console.error('Error claiming progress:', err);
      setMessage(err?.message || 'Failed to claim quest progress');
      throw err; // Re-throw so the caller can catch it
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    claimProgress,
    isSubmitting: isSubmitting || isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    message,
    setMessage,
  };
}

export function useQuestStats(questType: QuestType, questId: number) {
  const { address } = useAccount();
  
  // You can add more quest-related contract reads here
  // For example: useQuestProgress, useIsQuestCompleted, etc.
  
  return {
    address,
    questType,
    questId,
  };
}