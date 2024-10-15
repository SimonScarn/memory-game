import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import './styles/GameBoard.scss';
import './styles/Tile.scss';
import './styles/App.scss';


const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <h1 className="header">Memory Game</h1>
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
