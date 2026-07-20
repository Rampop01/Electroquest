'use client';

import { useAccount, useChainId, useReadContract } from 'wagmi';
import { formatEther } from 'viem';

export function useWeb3Account() {
  const { address, isConnected, chain } = useAccount();
  const chainId = useChainId();

  // Example: Get ETH balance
  const { data: balance } = useReadContract({
    address: address,
    abi: [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
      select: (data: bigint) => {
        if (typeof data === 'bigint') {
          return parseFloat(formatEther(data)).toFixed(4);
        }
        return '0';
      },
    },
  });

  return {
    address,
    isConnected,
    chainId,
    chainName: chain?.name,
    balance,
  };
}

// Add more wallet-related hooks as needed
