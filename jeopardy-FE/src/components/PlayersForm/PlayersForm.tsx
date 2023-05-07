import { v4 as uuidv4 } from 'uuid';
import { FormEvent, useRef } from 'react';
import { OptionsButtonItem } from '../OptionsItem/OptionsItem';
import PlayersInput from '../PlayersInput/PlayersInput';
import styles from './PlayersForm.module.scss';
import apiInstance from '../../services/axiosConfig';
import IPlayersForm from './IPlayersForm';

function PlayersForm({ number, onStepChange }: IPlayersForm) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const setInputRef = (ref: HTMLInputElement | null, index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRefs.current[index] = ref!;
  };

  const players = [...Array(+number)].map((e, i) => (
    <PlayersInput
      setInputRef={setInputRef}
      key={uuidv4()}
      playerId={i}
    />
  ));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allPlayers: string[] = [];
    const inputPromises = inputRefs.current.map(async (inputRef) => {
      const { value } = inputRef;
      allPlayers.push(value);
    });
    await Promise.all(inputPromises).then(() => {
      apiInstance
        .post('/saveUsers', JSON.stringify(allPlayers))
        .then(() => {
          window.location.assign('game');
        });
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.playersContainer}>{players}</div>
      <OptionsButtonItem title="Go Back" onClick={onStepChange} />
      <OptionsButtonItem title="Jeopardy time" onClick={() => handleSubmit} />
    </form>
  );
}

export default PlayersForm;
