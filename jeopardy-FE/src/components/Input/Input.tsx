import { useState } from 'react';
import IInput from './IInput';
import styles from './Input.module.scss';

function Input({
  label,
  placeholder,
  text,
  disabled = false,
  setChange,
  inputRef,
}: IInput) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setChange?.(`${e.currentTarget.value}`);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{text}</label>
      <input
        disabled={disabled}
        className={styles.input}
        id={label}
        name={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}
export default Input;
