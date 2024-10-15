import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { formatTime} from '../../utils/utils'; 
import { GameBoardHeaderProps } from '../../types';

const GameBoardHeader: React.FC<GameBoardHeaderProps> = ({ attempts, timer }) => {
  return (
    <div className="game-board__header">
      <div>
        Attempts: <span>{attempts}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faClock} /> Time elapsed: <span>{formatTime(timer)}</span> 
      </div>
    </div>
  );
};

export default GameBoardHeader;
