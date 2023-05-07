import { OptionsButtonItem } from '../OptionsItem/OptionsItem';
import styles from './NumberInput.module.scss';
import Input from '../Input/Input';
import INumberInput from './INumberInput';

function NumberInput({ handleStepChange, setNumber }: INumberInput) {
  return (
    <div className={styles.numberInputContainer}>
      <Input
        label="number"
        placeholder="Enter number"
        text="Enter the number of players"
        setChange={setNumber}
      />
      <OptionsButtonItem title="Next" onClick={handleStepChange} />
    </div>
  );
}

export default NumberInput;
