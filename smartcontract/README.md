QuestEth Smart Contracts (Foundry)

This folder contains a Foundry project scaffold with the core contracts used by the QuestEth frontend.

Contracts:
- XPToken.sol — ERC20 XP token, mintable by the GameCore minter role.
- ChapterNFT.sol — ERC721 NFTs awarded for chapter completion; mintable by GameCore.
- GameCore.sol — Core game contract: verifies off-chain signed progress vouchers (EIP-712), records progress, awards XP by minting XPToken, and allows users to mint chapter NFTs after completion.

How to use (quick):
1. Install Foundry: https://book.getfoundry.sh/getting-started/installation
2. From this folder run:
   - `forge build`
   - `forge test` (when tests exist)
3. Deploy and run examples with `cast` or your own deployment scripts.

Frontend notes:
- The frontend should get signed vouchers from your server (admin signer). A voucher includes: {user, questId, progress, xp, nonce, expiry} and an EIP-712 signature.
- Call `GameCore.claimProgress(...)` with the voucher payload and signature to write progress and receive XP on-chain. Then call `GameCore.mintChapter(...)` to mint the chapter NFT when eligible.

Security:
- Keep the backend signing key secure. Use nonces and expiries to prevent replay.
- Consider rate-limits and additional verification for high-value rewards.
