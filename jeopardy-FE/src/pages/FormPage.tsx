/* eslint-disable react/no-array-index-key */
import { Button } from 'primereact/button';
import { useState } from 'react';
import NumberInput from '../components/NumberInput';
import PlayersInput from '../components/PlayersInput';

function FormPage() {
  const [number, setNumber] = useState('1');
  const [isReady, setIsReady] = useState(false);
  const handleNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumber(e.currentTarget.value);
  };
  const handleStepChange = () => {
    if (!isReady)setIsReady(true);
    else setIsReady(false);
  };
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const players = [...Array(+number)].map((e, i) => <PlayersInput key={i} />);
  const group = (
    <div>
      {players}
      <Button label="Prev" onClick={handleStepChange} />
      <Button label="Jeopardy time" onClick={() => { window.location.assign('game'); }} />
    </div>
  );
  return (
    <form onSubmit={handleSubmit}>
      {!isReady
      && (
      <NumberInput
        number={number}
        handleChange={handleNumberChange}
        isReady={handleStepChange}
      />
      )}
      {isReady && group}
    </form>
  );
}

export default FormPage;
