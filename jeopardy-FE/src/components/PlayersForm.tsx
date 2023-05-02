/* eslint-disable react/no-array-index-key */
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
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
    const playersArr = Object.values(allPlayers).map(
      (player: any) => player.name,
    );
    axios
      .post('http://localhost:8080/saveUsers', JSON.stringify(playersArr))
      .then(() => {
        window.location.assign('game');
      });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.playersContainer}>{players}</div>
      <OptionsButtonItem title="Prev" onClick={onStepChange} />
      <OptionsButtonItem title="Jeopardy time" onClick={() => handleSubmit} />
    </form>
  );
}

export default PlayersForm;
