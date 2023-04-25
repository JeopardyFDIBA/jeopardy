/* eslint-disable react/no-array-index-key */
import React, { FormEvent, useState } from 'react';
import { OptionsButtonItem } from './OptionsItem';
import PlayersInput from './PlayersInput';
import styles from './PlayersForm.module.scss';

interface IPlayersForm {
  number: string;
  onStepChange: () => void;
}

function PlayersForm({ number, onStepChange }: IPlayersForm) {
  const [allPlayers, setAllPlayers] = useState({});

  const players = [...Array(+number)].map((e, i) => (
    <PlayersInput
      key={i}
      playerId={i}
      allPlayers={allPlayers}
      setAllPlayers={setAllPlayers}
    />
  ));
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('players', JSON.stringify(allPlayers));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.playersContainer}>{players}</div>
      <OptionsButtonItem title="Prev" onClick={onStepChange} />
      <OptionsButtonItem title="Jeopardy time" onClick={() => { window.location.assign('game'); }} />
    </form>
  );
}

export default PlayersForm;
