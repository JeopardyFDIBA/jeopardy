import { useState } from 'react';
import Input from '../Input/Input';
import styles from './Question.module.scss';
import IQuestionComponent from './IQuestionComponent';

function Question({
  setActive,
  questionObject,
  isInputBlocked,
  setBuzzer,
  setAnswer,
}: IQuestionComponent) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setAnswer(e.currentTarget.value);
  };
  return (
    <form
      className={styles.questionFocus}
      onSubmit={(e) => {
        e.preventDefault();
        setActive(false);
        setBuzzer('#0c0734');
        setValue('');
      }}
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
