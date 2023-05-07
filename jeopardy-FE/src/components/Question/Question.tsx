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
  return (
    <form
      className={styles.questionFocus}
      onSubmit={(e) => {
        e.preventDefault();
        setActive(false);
        setBuzzer('#0c0734');
      }}
    >
      <Input
        setChange={setAnswer}
        label={questionObject?.question || 'error'}
        placeholder="Enter your answer"
        text={questionObject?.question || 'error'}
        disabled={isInputBlocked}
      />
    </form>
  );
}

export default Question;
