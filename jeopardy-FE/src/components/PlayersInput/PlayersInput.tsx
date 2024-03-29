import { useRef, useEffect } from 'react';
import Input from '../Input/Input';
import IPlayersInput from './IPlayersInput';

function PlayersInput({
  playerId, setInputRef,
}
: IPlayersInput) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputRef(inputRef.current, playerId);
  }, [inputRef, playerId, setInputRef]);

  return (
    <Input
      inputRef={inputRef}
      label="number"
      placeholder="Enter name"
      text={`Player ${playerId + 1}: `}
    />
  );
}

export default PlayersInput;
