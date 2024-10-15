import React from 'react';
import { GameBoardDifficultyProps } from '../../types';

const GameBoardDifficulty: React.FC<GameBoardDifficultyProps> = ({
  selectedDifficulty,
  handleDifficultyChange,
}) => {
  return (
    <div className="game-board__difficulty">
      <label htmlFor="difficulty">Choose difficulty: </label>
      <select
        className="select-difficulty"
        id="difficulty"
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
      >
        <option value="easy">Easy (4 pairs)</option>
        <option value="medium">Medium (6 pairs)</option>
        <option value="hard">Hard (8 pairs)</option>
      </select>
    </div>
  );
};

export default GameBoardDifficulty;
