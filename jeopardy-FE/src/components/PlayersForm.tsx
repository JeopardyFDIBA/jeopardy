/* eslint-disable react/no-array-index-key */
import React from 'react';
import { OptionsButtonItem } from './OptionsItem';
import PlayersInput from './PlayersInput';
import styles from './PlayersForm.module.scss';

interface IForm {
  number: string;
  onStepChange: () => void;
}
function Form({ number, onStepChange }: IForm) {
  const players = [...Array(+number)].map((e, i) => <PlayersInput key={i} />);

  return (
    <div className={styles.container}>
      <div className={styles.playersContainer}>{players}</div>
      <OptionsButtonItem title="Prev" onClick={onStepChange} />
      <OptionsButtonItem title="Jeopardy time" onClick={() => { window.location.assign('game'); }} />
    </div>
  );
}

export default Form;
