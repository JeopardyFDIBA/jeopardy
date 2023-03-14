/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import Input from './Input';

function PlayersInput() {
  const [players, setPlayers] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPlayers(e.currentTarget.value);
    console.log(players);
  };
  return (
    <Input value={players} handleChange={handleChange} label="number" placeholder="Enter name" text="Player: " />
  );
}

export default PlayersInput;
