import { useState } from 'react';
import Input from '../Input/Input';
import styles from './Question.module.scss';
import IQuestionComponent from './IQuestionComponent';
import { checkAnswer, updateScore } from '../../services';
import { defaultColor } from '../../helpers/helpConstants';

function Question({
  setActive,
  questionObject,
  isInputBlocked,
  setBuzzer,
  activePlayer,
  setHasGameStarted,
  setReload,
  setShouldTryAgain,
  shouldTryAgain,
  reload,
}: IQuestionComponent) {
  const [answer, setAnswer] = useState('');
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer(questionObject?.id, answer)
        .then((response) => {
          if (response.correct) {
            if (questionObject?.score === 0) {
              setHasGameStarted?.(true);
            } else {
              updateScore(activePlayer?.id, questionObject?.score);
              setReload?.(!reload);
            }
          } else {
            setShouldTryAgain?.(!shouldTryAgain);
            console.log('error');
          }
        });
    }
  };
  return (
    <form
      className={styles.questionFocus}
      onSubmit={(e) => {
        e.preventDefault();
        setActive(false);
        setBuzzer(defaultColor);
      }}
      onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLFormElement>}
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
