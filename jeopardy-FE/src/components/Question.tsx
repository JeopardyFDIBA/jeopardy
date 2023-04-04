import { Dispatch, SetStateAction, useState } from 'react';
import Input from './Input';
import styles from './Question.module.scss';

interface IQuestion {
  setActive: Dispatch<SetStateAction<boolean>>,
  questionObject: { score: string, question: string } | undefined,
  isInputBlocked: boolean;
  setBuzzer: Dispatch<SetStateAction<string>>;
}

function Question({
  setActive, questionObject, isInputBlocked, setBuzzer,
} :IQuestion) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <form
      className={styles.questionFocus}
      onSubmit={(e) => { e.preventDefault(); setActive(false); setBuzzer('#0c0734'); }}
    >
      <Input
        handleChange={handleChange}
        value={value}
        label={questionObject?.question || 'error'}
        placeholder="Enter your answer"
        text={questionObject?.question || 'error'}
        disabled={isInputBlocked}
      />
    </form>
  );
}

export default Question;
