/* eslint-disable jsx-a11y/label-has-associated-control */

import Input from './Input';

interface IPlayerInput {
  key: number;
  number: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
function PlayersInput({ key, number, handleChange }: IPlayerInput) {
  return (
    <Input key={key} number={number} handleChange={handleChange} label="Player" placeholder="Enter name" text="Player Name" />
  );
}

export default PlayersInput;
