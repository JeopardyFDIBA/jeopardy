/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import Input from '../Input/Input';

interface IPlayersInput {
  playerId: number;
  allPlayers: object;
  setAllPlayers: React.Dispatch<React.SetStateAction<object>>;
}

function PlayersInput({ playerId, allPlayers, setAllPlayers }: IPlayersInput) {
  const [players, setPlayers] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPlayers(e.currentTarget.value);
    setAllPlayers({
      ...allPlayers,
      [`player${playerId}`]: {
        name: e.currentTarget.value,
        score: 100,
      },
    });
  };
  return (
    <Input
      value={players}
      handleChange={handleChange}
      label="number"
      placeholder="Enter name"
      text={`Player ${playerId + 1}: `}
    />
  );
}

export default PlayersInput;
