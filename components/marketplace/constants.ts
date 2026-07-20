
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
import { NFTItem } from "./types";

export const MOCK_NFTS: NFTItem[] = [
  { id: '1', name: 'Sword of the Ancients', price: 150, rarity: 'Legendary', category: 'Weapon', imageUrl: '/placeholder.jpg', creator: '0x123...456', likes: 342 },
  { id: '2', name: 'Shield of Valor', price: 85, rarity: 'Epic', category: 'Armor', imageUrl: '/placeholder.jpg', creator: '0xabc...def', likes: 128 },
  { id: '3', name: 'Potion of True Sight', price: 15, rarity: 'Rare', category: 'Potion', imageUrl: '/placeholder.jpg', creator: '0x789...012', likes: 56 },
  { id: '4', name: 'Leather Tunic', price: 5, rarity: 'Common', category: 'Armor', imageUrl: '/placeholder.jpg', creator: '0x345...678', likes: 12 },
  { id: '5', name: 'Amulet of Vitality', price: 210, rarity: 'Legendary', category: 'Artifact', imageUrl: '/placeholder.jpg', creator: '0x999...000', likes: 890 },
  { id: '6', name: 'Staff of Embers', price: 95, rarity: 'Epic', category: 'Weapon', imageUrl: '/placeholder.jpg', creator: '0x555...222', likes: 210 },
  { id: '7', name: 'Iron Gauntlets', price: 12, rarity: 'Common', category: 'Armor', imageUrl: '/placeholder.jpg', creator: '0x111...333', likes: 8 },
  { id: '8', name: 'Elixir of Haste', price: 20, rarity: 'Rare', category: 'Potion', imageUrl: '/placeholder.jpg', creator: '0x777...888', likes: 45 },
  { id: '9', name: 'Dragonbone Bow', price: 135, rarity: 'Epic', category: 'Weapon', imageUrl: '/placeholder.jpg', creator: '0xccc...ddd', likes: 312 },
  { id: '10', name: 'Ring of Shadows', price: 300, rarity: 'Legendary', category: 'Artifact', imageUrl: '/placeholder.jpg', creator: '0xeee...fff', likes: 1024 },
  { id: '11', name: 'Steel Helm', price: 18, rarity: 'Common', category: 'Armor', imageUrl: '/placeholder.jpg', creator: '0x444...555', likes: 22 },
  { id: '12', name: 'Tome of Wisdom', price: 50, rarity: 'Rare', category: 'Artifact', imageUrl: '/placeholder.jpg', creator: '0xaaa...bbb', likes: 88 },
];

export const CATEGORIES = ['All', 'Weapon', 'Armor', 'Artifact', 'Potion'];