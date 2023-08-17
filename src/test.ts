import { rollChampions } from './services/roller';
import { Champion } from './types';
import { Player, createPlayer, refreshShop, purchaseChampion } from './player';

const testPlayer: Player = createPlayer(20);
testPlayer.level = 8; // Set the level to 8

const testChampion: Champion = {
  name: 'Test Champion',
  cost: 5,
  traits: ['Trait1', 'Trait2']
};

const newRolls = rollChampions(testPlayer.level, 8);
console.log('New Rolls:', newRolls);

purchaseChampion(testPlayer, testChampion.cost);
console.log('Updated Player:', testPlayer);
