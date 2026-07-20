# Electroquest - Blockchain Quest Platform

Electroquest is a decentralized application (dApp) built on the Electroneum blockchain that enables users to participate in quests, complete tasks, and earn rewards. The platform combines the power of Next.js, Wagmi, Viem, and smart contracts to create an engaging Web3 experience.

## How a Round Works — Full Game Flow

Here is exactly what happens from the moment a player opens Electroquest to the moment their progress is permanently recorded on the Electroneum blockchain.

---

### Step 1 — Land on the Temple Gate (`/`)
The player arrives at the animated landing screen — a dark mystical temple backdrop with glowing particles. They read the intro and click **"Start Adventure"** to begin their journey.

---

### Step 2 — Choose Your Path (`/path-selection`)
The player is presented with two learning tracks to specialise in:

| Path | Description |
|------|-------------|
| **Electro Quests** | Learn about the Electroneum blockchain — its mission, DeFi ecosystem, stablecoins, and consensus mechanism |
| **Ethereum Quests** | Learn about Ethereum fundamentals — the EVM, smart contracts, gas, and Layer 2 scaling |

They pick one and are taken to the quest map for that path.

---

### Step 3 — Navigate the Quest Map (`/electro-quests` or `/ethereum-quests`)
A visual map displays up to **10 numbered quest nodes**. Each node is either:
- **Unlocked** — available to play
- **Locked** — requires completing the previous quest first
- **Completed** — already cleared and recorded on-chain

The player clicks an unlocked quest node to enter it.

---

### Step 4 — Read the Scroll (Quest Introduction Page)
Before the quiz begins, the player reads a short educational scroll — a rich text page explaining the topic they are about to be tested on. This teaches them the core concept (e.g. "What is CELO staking?" or "How does gas pricing work?").

---

### Step 5 — Enter the Quiz Room (`/quest/[type]/[id]/quiz`)
The player enters the quiz arena. This consists of:
- **10 multiple-choice questions** on the topic they just read
- A **progress bar** at the top showing question X of 10
- **Previous / Next / Submit** navigation buttons
- They must answer all 10 questions before submitting

---

### Step 6 — Results Screen
After submitting, the player sees their **score out of 10**:

| Score | Outcome |
|-------|---------|
| 7 / 10 or above | **Victory** — quest is passed |
| Below 7 / 10 | **Quest Failed** — they can retry immediately |

If they fail, they click **"Retry Quiz"** and start the 10 questions again from scratch.

---

### Step 7 — Connect Wallet & Claim On-Chain Rewards
If the player **passes**, the Victory screen appears. To claim their rewards they **must connect their Celo wallet** (MetaMask, Coinbase Wallet, or any injected wallet). The flow is:

1. Player clicks **"Connect Wallet"** — a compact, gaming-style selector appears
2. They choose their wallet and approve the connection
3. If they are on the wrong network, they are prompted to **switch to Celo**
4. They click **"Claim Rewards & Continue"**

---

### Step 8 — Secure Signature (EIP-712)
When the player clicks Claim, the frontend makes a call to the **`/api/sign-progress`** server-side API route. This route:
- Receives their wallet address and quiz result (score, time taken, XP amount)
- Verifies the data is legitimate
- Signs a structured **EIP-712 voucher** with the platform's private key
- Returns a cryptographic signature back to the frontend

This prevents anyone from forging their own claims — only scores signed by the platform are accepted by the smart contract.

---

### Step 9 — On-Chain Transaction (`GameCore.sol`)
The frontend takes the signed voucher and calls **`claimProgress()`** on the `GameCore` smart contract deployed on Celo Mainnet. The player signs and pays the small CELO gas fee in their wallet. The contract:
- Verifies the EIP-712 signature against the platform's signer address
- Checks the nonce has not been used before (replay protection)
- Mints **XP tokens** to the player's wallet via `XPToken.sol`
- Mints a **Chapter NFT** commemorating the completed quest via `ChapterNFT.sol`
- Emits a `ProgressClaimed` event on-chain

---

### Step 10 — Victory & Unlock Next Quest
Once the transaction is confirmed on-chain:
- The current quest is marked **Completed** on the map
- The **next quest node** is unlocked
- The player is redirected to the **Victory screen** (`/victory/[id]`) with a celebration animation
- Their wallet now holds the XP tokens and the Chapter NFT as proof of completion

---

### Step 11 — Repeat
The player returns to the quest map and repeats Steps 3–10 for each subsequent quest until all 10 are completed. Each completed quest permanently lives on the Electroneum blockchain as an NFT collectible.

---

> **Note**: The Leaderboard (`/leaderboard`) and Marketplace (`/marketplace`) pages are coming soon and will allow players to compare XP rankings globally and trade their Chapter NFTs.

## Features

- **Web3 Integration**: Seamless wallet connection with Wagmi and Viem
- **Smart Contract Interaction**: Interact with Celo smart contracts securely
- **EIP-712 Secure Vouchers**: Advanced off-chain signature generation via API to prevent cheating and secure on-chain minting
- **Opera MiniPay Ready**: 100% mobile-responsive design, optimized for embedded browser wallets like MiniPay
- **Responsive UI**: Built with modern React, Tailwind CSS, and a custom RPG aesthetic (Cinzel fonts, glowing elements)
- **Type Safety**: Full TypeScript support for better developer experience
- **DeFi Ready**: Integration with Celo and other EVM-compatible chains

## Tech Stack

- **Frontend**: Next.js 14 with React 19
- **Styling**: Tailwind CSS with custom RPG theme (Cinzel font, ambient glowing borders, glassmorphism)
- **State Management**: React Query for server state management
- **Blockchain**:
  - Wagmi v3 for wallet connections
  - Viem for Celo interaction and EIP-712 typing
  - Smart contracts written in Solidity
- **Backend/API**: Next.js App Router API for secure voucher signing
- **Animation**: Framer Motion & pure CSS for smooth animations
- **Icons**: Lucide React for beautiful icons

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- MetaMask or any Web3 wallet
- Basic understanding of Celo and smart contracts

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Queenode/Celoquest.git
   cd Celoquest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
   PRIVATE_KEY=your_platform_signer_private_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
Celoquest/
├── app/                # Next.js app directory
│   ├── api/            # Server-side API routes (EIP-712 signing)
│   ├── electro-quests/    # Celo quest map and quest pages
│   ├── leaderboard/    # Leaderboard page (coming soon)
│   ├── marketplace/    # NFT marketplace (coming soon)
│   └── victory/        # Victory celebration screen
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks (useQuest, useQuestCompletion)
├── lib/                # Utility functions and configurations
├── public/             # Static assets and background images
├── smartcontract/      # Smart contract source code
│   ├── src/            # Solidity contracts
│   └── foundry.toml    # Foundry configuration
└── constants/          # Contract addresses and network config
```

## Smart Contracts

The project includes Solidity smart contracts for managing quests and rewards. To work with the contracts:

1. Navigate to the `smartcontract` directory
2. Install Foundry (if not already installed):
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```
3. Install dependencies:
   ```bash
   forge install
   ```
4. Compile contracts:
   ```bash
   forge build
   ```

## Deployment

### Frontend
Deploy the Next.js application to Vercel or your preferred hosting provider.

### Smart Contracts

#### Celo Mainnet (Chain ID: 42220)

| Contract | Address |
| --- | --- |
| XPToken | `0xd9fc6cc979472a5fa52750ae26805462e1638872` |
| ChapterNFT | `0x274f499201b0716e6cb632ff5bec10cad508ead6` |
| Leaderboard | `0x3a89a1611b309cd883a22c99463936fc4a0dee03` |
| GameCore | `0xaa1deb4cc3c3386d813e7f7b2ff52a7c4efb675e` |

Explorer links:

- **XPToken**: https://celoscan.io/address/0xd9fc6cc979472a5fa52750ae26805462e1638872
- **ChapterNFT**: https://celoscan.io/address/0x274f499201b0716e6cb632ff5bec10cad508ead6
- **Leaderboard**: https://celoscan.io/address/0x3a89a1611b309cd883a22c99463936fc4a0dee03
- **GameCore**: https://celoscan.io/address/0xaa1deb4cc3c3386d813e7f7b2ff52a7c4efb675e

RPC: `https://forno.celo.org`
