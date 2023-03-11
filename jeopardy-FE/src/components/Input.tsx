/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './Input.module.scss';

interface IInput {
  number: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  text: string;
}
function Input({
  number, handleChange, label, placeholder, text,
}: IInput) {
  return (
    <>
      <label htmlFor={label}>{text}</label>
      <input
        className={styles.input}
        id={label}
        name={label}
        type="text"
        placeholder={placeholder}
        value={number}
        onChange={handleChange}
      />
    </>
  );
}

export default Input;
