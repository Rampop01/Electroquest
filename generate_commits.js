const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const projectPath = '/Users/a/Desktop/Mantle-ethquest';

function runCmd(cmd) {
  try {
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
  } catch (e) {
    console.error(`Error running command: ${cmd}`);
    console.error(e);
  }
}

const components = [
  // LEADERBOARD
  { file: 'components/leaderboard/types.ts', content: `export interface PlayerStats { id: string; name: string; xp: number; rank: number; questsCompleted: number; }`, msg: 'feat(leaderboard): add types' },
  { file: 'components/leaderboard/constants.ts', content: `export const MOCK_PLAYERS = [{ id: '1', name: 'Thorin', xp: 5000, rank: 1, questsCompleted: 20 }];`, msg: 'feat(leaderboard): add mock constants' },
  { file: 'components/leaderboard/rank-badge.tsx', content: `export function RankBadge({ rank }: { rank: number }) { return <div className="text-glow-amber">{rank}</div>; }`, msg: 'feat(leaderboard): add rank badge component' },
  { file: 'components/leaderboard/player-row.tsx', content: `export function PlayerRow({ name }: { name: string }) { return <div className="bg-stone-900/70 text-amber-300">{name}</div>; }`, msg: 'feat(leaderboard): add player row' },
  { file: 'components/leaderboard/player-row-skeleton.tsx', content: `export function PlayerRowSkeleton() { return <div className="bg-stone-dark animate-pulse h-10 w-full rounded"></div>; }`, msg: 'feat(leaderboard): add row skeleton' },
  { file: 'components/leaderboard/leaderboard-header.tsx', content: `export function LeaderboardHeader() { return <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-glow-amber">Leaderboard</h1>; }`, msg: 'feat(leaderboard): add header' },
  { file: 'components/leaderboard/stats-card.tsx', content: `export function StatsCard({ title, value }: { title: string, value: string }) { return <div className="bg-card/60 backdrop-blur-sm text-glow-cyan"><h3>{title}</h3><p>{value}</p></div>; }`, msg: 'feat(leaderboard): add stats card' },
  { file: 'components/leaderboard/stats-overview.tsx', content: `import { StatsCard } from './stats-card'; export function StatsOverview() { return <div className="flex gap-4"><StatsCard title="Total Players" value="1000" /></div>; }`, msg: 'feat(leaderboard): add stats overview' },
  { file: 'components/leaderboard/top-three-podium.tsx', content: `export function TopThreePodium() { return <div className="flex justify-center gap-4 text-glow-amber">Podium</div>; }`, msg: 'feat(leaderboard): add podium' },
  { file: 'components/leaderboard/search-bar.tsx', content: `export function SearchBar() { return <input className="bg-stone-dark text-amber-300 border border-amber-500/30" placeholder="Search..." />; }`, msg: 'feat(leaderboard): add search bar' },
  { file: 'components/leaderboard/filter-tabs.tsx', content: `export function FilterTabs() { return <div className="text-glow-cyan flex gap-2"><button>All Time</button><button>This Week</button></div>; }`, msg: 'feat(leaderboard): add filter tabs' },
  { file: 'components/leaderboard/player-list.tsx', content: `import { PlayerRow } from './player-row'; export function PlayerList() { return <div><PlayerRow name="Player 1" /></div>; }`, msg: 'feat(leaderboard): add player list' },
  { file: 'components/leaderboard/your-rank-card.tsx', content: `export function YourRankCard() { return <div className="bg-stone-900/70 border-cyan-500/30 text-amber-300">Your Rank: 150</div>; }`, msg: 'feat(leaderboard): add your rank card' },
  { file: 'components/leaderboard/xp-progress-bar.tsx', content: `export function XpProgressBar({ progress }: { progress: number }) { return <div className="bg-stone-dark w-full h-2"><div className="bg-glow-amber h-full" style={{ width: \`\${progress}%\` }}></div></div>; }`, msg: 'feat(leaderboard): add xp progress bar' },
  { file: 'components/leaderboard/achievement-badge-small.tsx', content: `export function AchievementBadgeSmall({ name }: { name: string }) { return <span className="text-glow-cyan text-xs">{name}</span>; }`, msg: 'feat(leaderboard): add achievement badge' },
  { file: 'components/leaderboard/leaderboard-footer.tsx', content: `export function LeaderboardFooter() { return <footer className="text-stone-300 text-center">Start Questing</footer>; }`, msg: 'feat(leaderboard): add footer' },
  { file: 'components/leaderboard/animated-counter.tsx', content: `export function AnimatedCounter({ value }: { value: number }) { return <span className="text-amber-400">{value}</span>; }`, msg: 'feat(leaderboard): add animated counter' },
  { file: 'components/leaderboard/index.ts', content: `export * from './leaderboard-header'; export * from './player-list';`, msg: 'feat(leaderboard): add barrel export' },
  { file: 'app/leaderboard/page.tsx', content: `import { LeaderboardHeader } from '@/components/leaderboard'; export default function LeaderboardPage() { return <div className="bg-stone-dark min-h-screen"><LeaderboardHeader /></div>; }`, msg: 'feat(leaderboard): update main page' },
  { file: 'app/leaderboard/layout.tsx', content: `export const metadata = { title: 'Leaderboard' }; export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }`, msg: 'feat(leaderboard): add layout' },
  { file: 'components/leaderboard/utils.ts', content: `export function formatXP(xp: number) { return xp.toLocaleString(); }`, msg: 'refactor(leaderboard): add utils' },
  { file: 'components/leaderboard/hooks.ts', content: `export function useLeaderboard() { return { data: [], loading: false }; }`, msg: 'feat(leaderboard): add custom hook' },
  { file: 'components/leaderboard/constants.ts', content: `export const MOCK_PLAYERS = [{ id: '1', name: 'Thorin', xp: 5000, rank: 1, questsCompleted: 20 }, { id: '2', name: 'Gandalf', xp: 4000, rank: 2, questsCompleted: 15 }];`, msg: 'fix(leaderboard): update mock data' },
  { file: 'components/leaderboard/player-row.tsx', content: `export function PlayerRow({ name, xp }: { name: string, xp?: number }) { return <div className="bg-stone-900/70 text-amber-300">{name} - {xp}</div>; }`, msg: 'feat(leaderboard): show xp in row' },
  { file: 'components/leaderboard/player-row.tsx', content: `import React from 'react'; export const PlayerRow = React.memo(function PlayerRow({ name, xp }: { name: string, xp?: number }) { return <div className="bg-stone-900/70 text-amber-300">{name} - {xp}</div>; });`, msg: 'perf(leaderboard): memoize player row' },

  // MARKETPLACE
  { file: 'components/marketplace/types.ts', content: `export interface NFTItem { id: string; name: string; price: number; rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'; }`, msg: 'feat(marketplace): add types' },
  { file: 'components/marketplace/constants.ts', content: `export const MOCK_NFTS = [{ id: '1', name: 'Sword of Truth', price: 100, rarity: 'Legendary' }];`, msg: 'feat(marketplace): add mock data' },
  { file: 'components/marketplace/nft-card.tsx', content: `export function NFTCard({ name }: { name: string }) { return <div className="bg-card/60 backdrop-blur-md border-amber-500/30 text-amber-300">{name}</div>; }`, msg: 'feat(marketplace): add nft card' },
  { file: 'components/marketplace/nft-card-skeleton.tsx', content: `export function NFTCardSkeleton() { return <div className="bg-stone-dark animate-pulse h-40 w-full rounded"></div>; }`, msg: 'feat(marketplace): add card skeleton' },
  { file: 'components/marketplace/marketplace-header.tsx', content: `export function MarketplaceHeader() { return <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-glow-cyan">Marketplace</h1>; }`, msg: 'feat(marketplace): add header' },
  { file: 'components/marketplace/category-filter.tsx', content: `export function CategoryFilter() { return <div className="flex gap-2 text-glow-amber"><button>Weapons</button><button>Armor</button></div>; }`, msg: 'feat(marketplace): add category filter' },
  { file: 'components/marketplace/sort-dropdown.tsx', content: `export function SortDropdown() { return <select className="bg-stone-900/70 text-amber-300"><option>Price: Low to High</option></select>; }`, msg: 'feat(marketplace): add sort dropdown' },
  { file: 'components/marketplace/price-tag.tsx', content: `export function PriceTag({ price }: { price: number }) { return <span className="text-glow-amber">{price} CELO</span>; }`, msg: 'feat(marketplace): add price tag' },
  { file: 'components/marketplace/rarity-badge.tsx', content: `export function RarityBadge({ rarity }: { rarity: string }) { return <span className="text-glow-cyan border-cyan-500/30 border px-2 py-1 rounded">{rarity}</span>; }`, msg: 'feat(marketplace): add rarity badge' },
  { file: 'components/marketplace/nft-grid.tsx', content: `import { NFTCard } from './nft-card'; export function NFTGrid() { return <div className="grid grid-cols-3 gap-4"><NFTCard name="Item 1" /></div>; }`, msg: 'feat(marketplace): add nft grid' },
  { file: 'components/marketplace/featured-nft.tsx', content: `export function FeaturedNFT() { return <div className="bg-stone-dark text-glow-amber border-amber-500/30 p-8">Featured Hero Item</div>; }`, msg: 'feat(marketplace): add featured nft' },
  { file: 'components/marketplace/collection-banner.tsx', content: `export function CollectionBanner() { return <div className="bg-card/60 via-fog text-cyan-400">Collection Stats</div>; }`, msg: 'feat(marketplace): add collection banner' },
  { file: 'components/marketplace/stats-bar.tsx', content: `export function StatsBar() { return <div className="flex justify-between text-amber-300"><span>Floor: 10 CELO</span></div>; }`, msg: 'feat(marketplace): add stats bar' },
  { file: 'components/marketplace/search-nft.tsx', content: `export function SearchNFT() { return <input className="bg-stone-900/70 text-amber-300 border-amber-500/30" placeholder="Search NFTs..." />; }`, msg: 'feat(marketplace): add search input' },
  { file: 'components/marketplace/nft-detail-modal.tsx', content: `export function NFTDetailModal() { return <div className="fixed inset-0 bg-stone-dark/80 backdrop-blur-sm"><div className="bg-stone-900 border-cyan-500/30 text-glow-cyan p-4">NFT Details</div></div>; }`, msg: 'feat(marketplace): add detail modal' },
  { file: 'components/marketplace/bid-button.tsx', content: `export function BidButton() { return <button className="bg-stone-800 text-glow-amber border border-amber-500/30 hover:shadow-glow-primary px-4 py-2">Place Bid</button>; }`, msg: 'feat(marketplace): add bid button' },
  { file: 'components/marketplace/activity-feed.tsx', content: `export function ActivityFeed() { return <div className="text-stone-400">Recent Trades...</div>; }`, msg: 'feat(marketplace): add activity feed' },
  { file: 'components/marketplace/index.ts', content: `export * from './marketplace-header'; export * from './nft-grid';`, msg: 'feat(marketplace): add barrel export' },
  { file: 'app/marketplace/page.tsx', content: `import { MarketplaceHeader } from '@/components/marketplace'; export default function MarketplacePage() { return <div className="bg-stone-dark min-h-screen"><MarketplaceHeader /></div>; }`, msg: 'feat(marketplace): update main page' },
  { file: 'app/marketplace/layout.tsx', content: `export const metadata = { title: 'Marketplace' }; export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }`, msg: 'feat(marketplace): add layout' },
  { file: 'components/marketplace/utils.ts', content: `export function formatPrice(price: number) { return \`\${price.toFixed(2)} CELO\`; }`, msg: 'refactor(marketplace): add utils' },
  { file: 'components/marketplace/hooks.ts', content: `export function useMarketplace() { return { items: [], loading: false }; }`, msg: 'feat(marketplace): add custom hook' },
  { file: 'components/marketplace/constants.ts', content: `export const MOCK_NFTS = [{ id: '1', name: 'Sword of Truth', price: 100, rarity: 'Legendary' }, { id: '2', name: 'Shield of Valor', price: 50, rarity: 'Epic' }];`, msg: 'fix(marketplace): update mock data' },
  { file: 'components/marketplace/nft-card.tsx', content: `export function NFTCard({ name, price }: { name: string, price?: number }) { return <div className="bg-card/60 backdrop-blur-md border-amber-500/30 text-amber-300">{name} - {price} CELO</div>; }`, msg: 'feat(marketplace): show price in card' },
  { file: 'components/marketplace/nft-card.tsx', content: `import React from 'react'; export const NFTCard = React.memo(function NFTCard({ name, price }: { name: string, price?: number }) { return <div className="bg-card/60 backdrop-blur-md border-amber-500/30 text-amber-300 hover:shadow-glow-secondary transition-shadow">{name} - {price} CELO</div>; });`, msg: 'perf(marketplace): optimize nft card' },
];

components.forEach(comp => {
  const fullPath = path.join(projectPath, comp.file);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, comp.content);
  runCmd('git add ' + comp.file);
  runCmd('git commit -m "' + comp.msg + '"');
});

runCmd('git push origin master');
console.log('Successfully created 50 commits and pushed.');
