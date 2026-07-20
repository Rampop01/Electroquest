
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type Category = 'Weapon' | 'Armor' | 'Artifact' | 'Potion';

export interface NFTItem {
  id: string;
  name: string;
  price: number;
  rarity: Rarity;
  category: Category;
  imageUrl: string;
  creator: string;
  likes: number;
}