import React from 'react';
import Tile from './Tile';
import { TilesProps } from '../types'; 



const Tiles: React.FC<TilesProps> = ({ tiles }) => {
  return (
    <div className="tiles">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          id={tile.id}
          image={tile.image}
          isFlipped={tile.isFlipped}
          isMatched={tile.isMatched}
        />
      ))}
    </div>
  );
};

export default Tiles;
