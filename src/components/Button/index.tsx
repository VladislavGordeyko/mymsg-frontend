import React from 'react';
import { IButton } from './models';
import styles from './button.module.scss';

const Button: React.FC<IButton> = ({ onClick, text, disabled, className }) => {
  return (
    <button 
      className={`${className ? className : ''} ${styles.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;