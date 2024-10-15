import React from 'react';
import Button from '../Button';
import { faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';
import { GameBoardButtonsProps } from '../../types';


const GameBoardButtons: React.FC<GameBoardButtonsProps> = ({ gameStarted, startGame, resetGame }) => {
  return (
    <div className="game-board__buttons">
      {!gameStarted ? (
        <Button onClick={startGame} label="Start game" icon={faPlay} className="button-start" />
      ) : (
        <Button onClick={resetGame} label="Reset game" icon={faRedo} className="button-reset" />
      )}
    </div>
  );
};

export default GameBoardButtons;
