# Deployment Guide for Electroneum Network

This guide will help you deploy the Electroquest smart contracts to the Electroneum network.

## Prerequisites

1. **Foundry Installation**: Make sure Foundry is installed
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. **Electroneum Network Setup**:
   - **Mainnet**: Chain ID `42220`
   - **Testnet (Testnet)**: Chain ID `44787`
   - Get testnet ELECTRONEUM from: https://faucet.electroneum.org

3. **Required Accounts**:
   - **Deployer Account**: Account with ELECTRONEUM (Electroneum native token) to pay for gas
   - **Reward Signer Account**: Separate account that will sign progress vouchers (EIP-712)

## Step 1: Install Dependencies

```bash
cd smartcontract
forge install OpenZeppelin/openzeppelin-contracts
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in the required values:
   ```bash
   # Your deployer private key (without 0x prefix)
   PRIVATE_KEY=your_private_key_here
   
   # Address that will sign progress vouchers
   REWARD_SIGNER=0xYourRewardSignerAddress
   
   # RPC URLs (use testnet for testing)
   ELECTRONEUM_RPC_URL=https://forno.electroneum.org
   ELECTRONEUM_ALFAJORES_RPC_URL=https://testnet-forno.electroneum-testnet.org
   
   # Optional: API key for contract verification (Electroneumscan)
   ELECTRONEUMSCAN_API_KEY=your_api_key_here
   ```

## Step 3: Build Contracts

```bash
forge build
```

## Step 4: Deploy to Electroneum Testnet Testnet (Recommended First)

```bash
# Deploy to Electroneum Testnet
forge script script/Deploy.s.sol:Deploy \
  --rpc-url testnet \
  --broadcast \
  --verify \
  -vvvv
```

## Step 5: Deploy to Electroneum Mainnet

**⚠️ WARNING: Only deploy to mainnet after thorough testing on testnet!**

```bash
# Deploy to Electroneum Mainnet
forge script script/Deploy.s.sol:Deploy \
  --rpc-url electroneum \
  --broadcast \
  --verify \
  -vvvv
```

## Step 6: Verify Deployment

After deployment, the script will output all contract addresses. Verify them on Electroneumscan:
- **Mainnet**: https://electroneumscan.io
- **Testnet**: https://testnet.electroneumscan.io

## Deployment Order

The deployment script automatically handles the correct order:

1. **XPToken** - ERC20 token for XP rewards
2. **ChapterNFT** - ERC721 NFTs for chapter completion
3. **Leaderboard** - Tracks player scores and rankings
4. **GameCore** - Main game contract that coordinates everything

After deployment, the script automatically:
- Grants `MINTER_ROLE` to GameCore for XPToken
- Grants `MINTER_ROLE` to GameCore for ChapterNFT
- Grants `GAME_ROLE` to GameCore for Leaderboard
- Links Leaderboard to GameCore

## Post-Deployment Configuration

### Update Frontend Configuration

After deployment, update your frontend configuration with the deployed contract addresses in `constants/contracts.ts`.

### Update NFT Base URI

If you need to change the NFT metadata URI after deployment:

```bash
cast send <ChapterNFT_ADDRESS> "setBaseURI(string)" "https://your-new-base-uri.com/nft/" \
  --rpc-url electroneum \
  --private-key $PRIVATE_KEY
```

### Update Reward Signer

If you need to change the reward signer address:

```bash
cast send <GameCore_ADDRESS> "setRewardSigner(address)" <NEW_SIGNER_ADDRESS> \
  --rpc-url electroneum \
  --private-key $PRIVATE_KEY
```

## Security Considerations

1. **Private Key Security**: 
   - Never commit your `.env` file to version control
   - Use a hardware wallet or secure key management for production
   - Consider using a multisig wallet for admin functions

2. **Reward Signer**:
   - Use a separate account from the deployer
   - Keep the private key secure on your backend server
   - Implement proper nonce management and expiry checks

3. **Access Control**:
   - The deployer account gets `ADMIN_ROLE` on all contracts
   - Consider transferring admin roles to a multisig wallet

## Troubleshooting

### Insufficient Gas
If deployment fails due to gas:
- Ensure your deployer account has enough ELECTRONEUM
- Check gas prices: https://electroneumscan.io/gastracker

### Contract Verification Failed
If verification fails:
- Ensure `ELECTRONEUMSCAN_API_KEY` is set correctly
- Try manual verification on Electroneumscan

### RPC Connection Issues
If RPC connection fails:
- Check your RPC URL is correct
- Try alternative RPC endpoints (e.g., Ankr, QuickNode)

## Deployed Contracts (Electroneum Mainnet)

| Contract | Address |
| :--- | :--- |
| **XPToken** | `0x40964fe5ad88565a1cc144c567e446efa3464483` |
| **ChapterNFT** | `0x4e703a7f1c21e9ca2236a79ae2ba77d892ba4b75` |
| **Leaderboard** | `0x664653fbd55982eba38328f2be408e93280133db` |
| **GameCore** | `0x4119c4b90bbd7b9f598c53a44294fa05fe9f26fd` |

## Support

For issues or questions:
- Electroneum Docs: https://docs.electroneum.org
- Foundry Book: https://book.getfoundry.sh
