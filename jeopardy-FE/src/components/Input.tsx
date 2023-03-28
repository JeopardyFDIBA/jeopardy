/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './Input.module.scss';

interface IInput {
  // eslint-disable-next-line react/require-default-props
  value?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  text: string;
}
function Input({
  value, handleChange, label, placeholder, text,
}: IInput) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{text}</label>
      <input
        className={styles.input}
        id={label}
        name={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
