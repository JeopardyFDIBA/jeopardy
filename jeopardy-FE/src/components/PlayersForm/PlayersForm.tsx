/* eslint-disable react/no-array-index-key */
import React, { FormEvent, useState } from 'react';
import { OptionsButtonItem } from '../OptionsItem/OptionsItem';
import PlayersInput from '../PlayersInput/PlayersInput';
import styles from './PlayersForm.module.scss';
import apiInstance from '../../services/axiosConfig';

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
    apiInstance
      .post('/saveUsers', JSON.stringify(playersArr))
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
