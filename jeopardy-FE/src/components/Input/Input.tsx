import IInput from './IInput';
import styles from './Input.module.scss';

function Input({
  value,
  handleChange,
  label,
  placeholder,
  text,
  disabled,
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
