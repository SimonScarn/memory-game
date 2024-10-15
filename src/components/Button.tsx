import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
  onClick: () => void;
  label: string;
  icon: IconDefinition;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon, className = '' }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      <FontAwesomeIcon icon={icon} /> {label}
    </button>
  );
};

export default Button;
