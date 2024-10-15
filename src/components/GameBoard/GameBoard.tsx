import React, { useState, useEffect } from 'react';
import useStore from '../../store/store';
import Tiles from '../Tiles';
import GameBoardDifficulty from './GameBoardDifficulty';
import GameBoardHeader from './GameBoardHeader';
import IconSelector from '../IconSelector';
import GameBoardFooter from './GameBoardFooter';  
import GameBoardButtons from './GameBoardButtons'; 
import { availableImages } from '../../assets/icons';
import { Difficulty } from '../../types';

const difficultyObj = { easy: 8, medium: 12, hard: 16 };

const GameBoard: React.FC = () => {
  const tiles = useStore((state) => state.tiles);
  const attempts = useStore((state) => state.attempts);
  const timer = useStore((state) => state.timer);
  const startGame = useStore((state) => state.startGame);
  const resetGame = useStore((state) => state.resetGame);
  const setDifficulty = useStore((state) => state.setDifficulty);
  const gameStarted = useStore((state) => state.gameStarted);
  const difficulty = useStore((state) => state.difficulty);
  const isLoading = useStore((state) => state.isLoading);
  const matchedPairs = useStore((state) => state.matchedPairs);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty);
  const [animateClass, setAnimateClass] = useState('');

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = e.target.value as Difficulty; 
    setSelectedDifficulty(newDifficulty);
    setDifficulty(newDifficulty);
  };

  useEffect(() => {
    if (matchedPairs > 0) {
      setAnimateClass('animate');
      const timeoutId = setTimeout(() => {
        setAnimateClass('');
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [matchedPairs]);

  if (isLoading) {
    return <div className="loading">Loading next level...</div>;
  }

  return (
    <div className="game-board">
      <GameBoardHeader attempts={attempts} timer={timer} />
      {!gameStarted && (
        <>
          <GameBoardDifficulty
            selectedDifficulty={selectedDifficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
          <div className="divider"></div>
          <IconSelector
            key={selectedDifficulty}
            availableImages={availableImages}
            maxIcons={difficultyObj[selectedDifficulty] / 2}
          />
        </>
      )}
      {gameStarted && (
        <>
          <Tiles tiles={tiles} />
          <GameBoardFooter
            matchedPairs={matchedPairs}
            totalPairs={difficultyObj[selectedDifficulty] / 2}
            animateClass={animateClass}
          />
        </>
      )}
      <GameBoardButtons
        gameStarted={gameStarted}
        startGame={startGame}
        resetGame={resetGame}
      />
    </div>
  );
};

export default GameBoard;
