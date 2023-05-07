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
  shouldBeNumber,
}: IInput) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (shouldBeNumber) {
      if (/^(|[1-9]+)$/.test(newValue)) { // check that newValue is a number between 1 and 9
        setValue(newValue);
        setChange?.(`${newValue}`);
      }
    } else {
      setValue(e.currentTarget.value);
      setChange?.(`${e.currentTarget.value}`);
    }
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
