import React, { useEffect } from 'react';
import './../styles/IconSelector.scss';
import useStore from '../store/store';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { IconSelectorProps } from '../types';
import Button from './Button';

const IconSelector: React.FC<IconSelectorProps> = ({
  availableImages,
  maxIcons,
}) => {
  const updateSelectedIcons = useStore((state) => state.updateSelectedIcons);
  const selectedIcons = useStore((state) => state.selectedIcons);
  const handleRandomize = useStore((state) => state.handleRandomize);

  useEffect(() => {
    if (selectedIcons.length > maxIcons) {
      updateSelectedIcons(selectedIcons.slice(0, maxIcons));
    }
  }, [maxIcons, selectedIcons, updateSelectedIcons]);

  const handleIconClick = (icon: string) => {
    if (selectedIcons.includes(icon)) {
      updateSelectedIcons(selectedIcons.filter(i => i !== icon));
    } else if (selectedIcons.length < maxIcons) {
      updateSelectedIcons([...selectedIcons, icon]);
    }
  };

  return (
    <div className="icon-selector">
      <h3>Select Your Icons</h3>
      <Button 
        onClick={handleRandomize}
        label="Randomize"
        icon={faShuffle} 
        className="button-randomize"
      />
      <div className="icon-grid" data-max-icons={maxIcons}>
        {availableImages.map(icon => (
          <button
            key={icon}
            className={`icon-button ${selectedIcons.includes(icon) ? 'selected' : ''}`}
            data-selected={selectedIcons.includes(icon)} 
            onClick={() => handleIconClick(icon)}
            disabled={!selectedIcons.includes(icon) && selectedIcons.length >= maxIcons}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;
