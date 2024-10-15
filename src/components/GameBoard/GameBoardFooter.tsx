import React from 'react';
import { GameBoardFooterProps } from '../../types';

const GameBoardFooter: React.FC<GameBoardFooterProps> = ({ matchedPairs, totalPairs, animateClass }) => {
  return (
    <div className="game-board__footer">
      Matched pairs: <span className={`matched-pairs ${animateClass}`}>{matchedPairs}/{totalPairs}</span>
    </div>
  );
};

export default GameBoardFooter;
