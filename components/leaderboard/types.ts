/**
 * @file types.ts
 * @description Core implementation module for Electroquest.
 */
export interface PlayerStats {
  id: string;
  rank: number;
  name: string;
  address: string;
  questsCompleted: number;
  totalXp: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
}