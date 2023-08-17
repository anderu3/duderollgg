import React, { useState } from 'react';
import { rollChampions } from './services/roller';
import { Champion } from './types';
import { Player, createPlayer, refreshShop } from './player';
import DraggableUnit from './DraggableUnit';

const ShopRolls = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [rolls, setRolls] = useState<(Champion | null)[]>([]);
  const [purchasedChampions, setPurchasedChampions] = useState<string[]>([]);
  const [initialGold, setInitialGold] = useState<number>(0);

  const getChampionShopImage = (championName: string) => {
    return require(`./assets/champion_in_shop/1cost/${championName}.png`);
  };

  const getChampionSpriteImage = (name: string) => {
    try {
      return require(`./assets/champion_sprites/1cost/${name}.png`);
    } catch (error) {
      console.warn(`Image not found for champion: ${name}`);
      return require('./assets/champion_sprites/1cost/default.png');
    }
  };

  const handleRoll = () => {
    if (player) {
      const newRolls = rollChampions(player.level);
      setRolls(newRolls);
      refreshShop(player);
      setPlayer({ ...player });
    }
  };

  const handlePurchase = (champion: Champion, index: number) => {
    if (player) {
      const newRolls = [...rolls];
      newRolls[index] = null;
      setRolls(newRolls);
      setPurchasedChampions([...purchasedChampions, champion.name]);
      setPlayer({ ...player, gold: player.gold - champion.cost });
    }
  };

  const handleStartGame = () => {
    const newPlayer = createPlayer(initialGold);
    setPlayer(newPlayer);
    setRolls([]);
  };

  return (
    <div>
      <h1>Shop Rolls</h1>
      {!player ? (
        <div>
          <input
            type="number"
            value={initialGold}
            onChange={(e) => setInitialGold(Number(e.target.value))}
            placeholder="Enter initial gold"
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <p>Gold: {player.gold}</p>
          <button onClick={handleRoll}>Roll</button>
          <div style={{ display: 'flex' }}>
            {rolls.map((champion, index) => (
              <div key={index} style={{ flex: '1' }}>
                {champion ? (
                  <div>
                    <img src={getChampionShopImage(champion.name)} alt={champion.name} />
                    <p>Cost: {champion.cost}</p>
                    <button onClick={() => handlePurchase(champion, index)}>Purchase</button>
                  </div>
                ) : (
                  <div>
                    <p>Purchased</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            {purchasedChampions.map((championName, index) => (
              <DraggableUnit key={index} championName={championName} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

}

export default ShopRolls;