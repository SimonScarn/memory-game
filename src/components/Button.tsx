import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ onClick, label, icon, className = '' }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      <FontAwesomeIcon icon={icon} /> {label}
    </button>
  );
};

export default Button;
