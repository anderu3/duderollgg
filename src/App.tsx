// src/App.tsx
import React from 'react';
import champions from './data/champions';

function App() {
  return (
    <div className="App">
      <h1>TFT Rolldown Simulator</h1>
      <ul>
        {champions.map(champion => (
          <li key={champion.name}>
            {champion.name} - Cost: {champion.cost} - Traits: {champion.traits.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
