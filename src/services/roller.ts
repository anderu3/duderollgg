import { Champion } from '../types';
import { champions } from '../data/champions';
import { Player } from '../player'; // Import player functions

interface Probabilities {
  [tier: number]: number;
}

const probabilitiesByLevel: Record<number, Probabilities> = {
    2: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0 },  
    5: { 1: 45, 2: 33, 3: 15, 4: 2, 5: 0 },
    6: { 1: 25, 2: 40, 3: 30, 4: 5, 5: 0 },
    7: { 1: 19, 2: 30, 3: 35, 4: 15, 5: 1 },
    8: { 1: 16, 2: 20, 3: 35, 4: 25, 5: 4 },
    9: { 1: 9, 2: 15, 3: 30, 4: 30, 5: 16 },
}

export function rollChampions(level: number, rolls: number = 5): Champion[] {
  const result: Champion[] = [];
  const probs = probabilitiesByLevel[level];
  const championsByTier: Record<number, Champion[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  // Categorize champions by cost/tier
  for (const champ of champions) {
    championsByTier[champ.cost].push(champ);
  }

  let totalRolls = 0; // Counter for total rolls
  while (result.length < rolls && totalRolls < 5) {
    let cumulativeProbability = 0;
    const randomValue = Math.random() * 100;
    for (const tier of [1, 2, 3, 4, 5]) {
      cumulativeProbability += probs[tier];
      if (randomValue <= cumulativeProbability) {
        const randomChampIndex = Math.floor(
          Math.random() * championsByTier[tier].length
        );
        result.push(championsByTier[tier][randomChampIndex]);
        totalRolls++;
        break;
      }
    }
  }

  return result;
}
