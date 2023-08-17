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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {!player ? (
          <div>
            <input
              type="number"
              value={initialGold}
              onChange={(e) => setInitialGold(parseInt(e.target.value))}
              placeholder="Enter initial gold"
            />
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <p>Gold: {player.gold}</p>
            <button onClick={handleRoll}>Roll</button>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {purchasedChampions.map((championName, index) => (
                <DraggableUnit key={index} championName={championName} />
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex' }}> {/* Horizontal layout for shop champions */}
          {rolls.map((champion, index) => (
            <div key={index} style={{ flex: '1' }}>
              {champion ? (
                <div>
                  <img
                    src={getChampionShopImage(champion.name)}
                    alt={champion.name}
                    onClick={() => handlePurchase(champion, index)}
                  />
                  <p>Cost: {champion.cost}</p>
                </div>
              ) : (
                <div>
                  <p>Purchased</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopRolls;
