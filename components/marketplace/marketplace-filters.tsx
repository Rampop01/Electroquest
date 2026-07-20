
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortOption = 'recent' | 'price-low' | 'price-high' | 'oldest' | 'most-liked';
type Category = 'all' | 'pets' | 'weapons' | 'armor' | 'artifacts' | 'collectibles';

const CATEGORIES = [
  { value: 'all', label: 'All Items' },
  { value: 'pets', label: 'Pets' },
  { value: 'weapons', label: 'Weapons' },
  { value: 'armor', label: 'Armor' },
  { value: 'artifacts', label: 'Artifacts' },
  { value: 'collectibles', label: 'Collectibles' },
];

const RARITIES = [
  { value: 'all', label: 'All Rarities' },
  { value: 'common', label: 'Common' },
  { value: 'uncommon', label: 'Uncommon' },
  { value: 'rare', label: 'Rare' },
  { value: 'epic', label: 'Epic' },
  { value: 'legendary', label: 'Legendary' },
  { value: 'mythic', label: 'Mythic' },
];

interface MarketplaceFiltersProps {
  onSearch?: (query: string) => void;
  onSortChange?: (sortBy: SortOption) => void;
  onCategoryChange?: (category: Category) => void;
  onRarityChange?: (rarity: string) => void;
  onPriceRangeChange?: (range: [number, number]) => void;
  className?: string;
}

export function MarketplaceFilters({ 
  onSearch,
  onSortChange,
  onCategoryChange,
  onRarityChange,
  onPriceRangeChange,
  className 
}: MarketplaceFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [category, setCategory] = useState<Category>('all');
  const [rarity, setRarity] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSortChange = (value: string) => {
    const sortValue = value as SortOption;
    setSortBy(sortValue);
    onSortChange?.(sortValue);
  };

  const handleCategoryChange = (value: string) => {
    const categoryValue = value as Category;
    setCategory(categoryValue);
    onCategoryChange?.(categoryValue);
  };

  const handleRarityChange = (value: string) => {
    setRarity(value);
    onRarityChange?.(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const newRange = value as [number, number];
    setPriceRange(newRange);
    onPriceRangeChange?.(newRange);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('recent');
    setCategory('all');
    setRarity('all');
    setPriceRange([0, 10]);
    onSearch?.('');
    onSortChange?.('recent');
    onCategoryChange?.('all');
    onRarityChange?.('all');
    onPriceRangeChange?.([0, 10]);
  };

  if (!isMounted) {
    return null;
  }

  const hasActiveFilters = searchQuery || sortBy !== 'recent' || category !== 'all' || rarity !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 10;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between sm:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="gap-2"
        >
          {showMobileFilters ? (
            <X className="h-4 w-4" />
          ) : (
            <Filter className="h-4 w-4" />
          )}
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className={`${!showMobileFilters ? 'hidden sm:block' : 'block'}`}>
        {/* Search and Sort */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search NFTs by name, description, or attributes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/80 backdrop-blur-sm"
              />
            </div>
          </form>

          <div className="flex items-center space-x-2">
            <span className="hidden text-sm text-muted-foreground sm:inline-block">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 border-b border-muted/30">
          <Tabs 
            value={category} 
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="h-auto w-full justify-start overflow-x-auto p-0">
              {CATEGORIES.map((cat) => (
                <TabsTrigger 
                  key={cat.value} 
                  value={cat.value}
                  className="relative px-4 py-2 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {cat.label}
                  {category === cat.value && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"></span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Rarity</h3>
            <Select
              value={rarity}
              onValueChange={handleRarityChange}
            >
              <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                <SelectValue placeholder="Select rarity" />
              </SelectTrigger>
              <SelectContent>
                {RARITIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Price Range</h3>
              <span className="text-xs text-muted-foreground">
                {priceRange[0]} - {priceRange[1]} ETH
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              min={0}
              max={10}
              step={0.1}
              minStepsBetweenThumbs={0.1}
              className="py-4"
            />
          </div>

          {hasActiveFilters && (
            <div className="flex items-end">
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-transparent"
              >
                <X className="mr-2 h-4 w-4" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
