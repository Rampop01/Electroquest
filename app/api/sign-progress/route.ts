import { NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';

export async function POST(request: Request) {
  try {
    const MASTER_PRIVATE_KEY = process.env.PRIVATE_KEY;
    if (!MASTER_PRIVATE_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { user, questType, questId, quizScore, timeTaken, xp } = body;

    if (!user || questType === undefined || questId === undefined || quizScore === undefined || timeTaken === undefined || xp === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const masterAccount = privateKeyToAccount(
      MASTER_PRIVATE_KEY.startsWith('0x') ? (MASTER_PRIVATE_KEY as `0x${string}`) : `0x${MASTER_PRIVATE_KEY}`
    );

    const nonce = Math.floor(Math.random() * 1000000000);
    const expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour expiry

    const signature = await masterAccount.signTypedData({
      domain: {
        name: 'QuestEthGame',
        version: '1',
        chainId: 42220, // Celo Mainnet
        verifyingContract: CONTRACT_ADDRESSES.ELECTRONEUM.GAME_CORE as `0x${string}`,
      },
      types: {
        Progress: [
          { name: 'user', type: 'address' },
          { name: 'questType', type: 'uint8' },
          { name: 'questId', type: 'uint256' },
          { name: 'quizScore', type: 'uint256' },
          { name: 'timeTaken', type: 'uint256' },
          { name: 'xp', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'expiry', type: 'uint256' },
        ],
      },
      primaryType: 'Progress',
      message: {
        user: user as `0x${string}`,
        questType: Number(questType),
        questId: BigInt(questId),
        quizScore: BigInt(quizScore),
        timeTaken: BigInt(timeTaken),
        xp: BigInt(xp),
        nonce: BigInt(nonce),
        expiry: BigInt(expiry),
      },
    });

    return NextResponse.json({
      signature,
      nonce,
      expiry,
    });
  } catch (error: any) {
    console.error('Signature generation error:', error);
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
  }
}
