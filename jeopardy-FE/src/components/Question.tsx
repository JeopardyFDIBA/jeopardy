/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Dispatch, SetStateAction } from 'react';
import styles from './Question.module.scss';
/* eslint-disable jsx-a11y/click-events-have-key-events */
function Question({ setActive }: { setActive: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div
      className={styles.questionFocus}
      onClick={() => setActive(false)}
    >
      Question
    </div>
  );
}

export default Question;
