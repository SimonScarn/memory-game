import React from 'react';
import useStore from '../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { TileProps } from '../types';

const Tile: React.FC<TileProps> = ({ id, image, isFlipped, isMatched }) => {
  const revealTile = useStore((state) => state.revealTile);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      revealTile(id); 
    }
  };

  return (
    <div
      className="tile"
      data-flipped={isFlipped}
      data-matched={isMatched}
      onClick={handleClick}
    >
      {isFlipped || isMatched ? (
        <span>{image}</span>
      ) : (
        <div className="icon-container">
          <FontAwesomeIcon icon={faQuestion} className="question-icon" />
        </div>
      )}
    </div>
  );
};

export default Tile;
