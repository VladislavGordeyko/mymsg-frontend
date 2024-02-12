import React, { EventHandler } from 'react';
import { ITextInput } from './models';
import styles from './textInput.module.scss';
const TextInput: React.FC<ITextInput> = ({ onChange, placeholder, value, suggestions, label, className }) => {

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      {label && <div className={styles['text-input__label']}>{label}</div>}
      <input placeholder={placeholder} className={styles['text-input']} value={value} onChange={onChangeHandle} />
    </div>
  );
};

export default TextInput;