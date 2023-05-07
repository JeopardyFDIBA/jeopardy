import { OptionsButtonItem } from '../OptionsItem/OptionsItem';
import styles from './NumberInput.module.scss';
import Input from '../Input/Input';

interface INumberInput {
  number: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  isReady: () => void;
}
function NumberInput({ number, handleChange, isReady }: INumberInput) {
  return (
    <div className={styles.numberInputContainer}>
      <Input
        value={number}
        handleChange={handleChange}
        label="number"
        placeholder="Enter number"
        text="Enter the number of players"
      />
      <OptionsButtonItem title="Next" onClick={isReady} />
    </div>
  );
}

export default NumberInput;
