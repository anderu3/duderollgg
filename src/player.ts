// player.ts

export interface Player {
  gold: number;
  level: number;
}

export function createPlayer(startingGold: number): Player {
  return { gold: startingGold, level: 2 }; 
}

export function refreshShop(player: Player): void {
  player.gold -= 2;
}

export function purchaseChampion(player: Player, championCost: number): void {
  player.gold -= championCost;
}
