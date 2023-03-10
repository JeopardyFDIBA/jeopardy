/* eslint-disable jsx-a11y/label-has-associated-control */
import { OptionsButtonItem } from './OptionsItem';
import styles from './NumberInput.module.scss';
import Input from './Input';

interface INumberInput {
  number: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  isReady: () => void
}
function NumberInput({ number, handleChange, isReady }:INumberInput) {
  return (
    <div className={styles.container}>
      <Input number={number} handleChange={handleChange} label="number" placeholder="Enter number" text="Enter the number of players" />
      <OptionsButtonItem title="Next" onClick={isReady} />
    </div>
  );
}

export default NumberInput;
