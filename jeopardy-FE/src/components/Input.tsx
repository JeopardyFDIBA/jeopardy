/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './Input.module.scss';

interface IInput {
  value?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  text: string;
  disabled?: boolean;
}
function Input({
  value, handleChange, label, placeholder, text, disabled,
}: IInput) {
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
      />
    </div>
  );
}

Input.defaultProps = {
  disabled: false,
  value: '',
};
export default Input;
