import React from 'react';
import './App.css';
import ShopRolls from './ShopRolls';
import DraggableUnit from './DraggableUnit'; // Make sure to import the new component

function App() {
  return (
    <div className="App no-select">
      <DraggableUnit />
      <ShopRolls />
    </div>
  );
}

export default App;
