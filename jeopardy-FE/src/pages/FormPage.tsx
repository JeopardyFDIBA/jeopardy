import { useState } from 'react';
import NumberInput from '../components/NumberInput';
import PlayersForm from '../components/PlayersForm';

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
      {isReady && <PlayersForm number={number} onStepChange={handleStepChange} />}
    </form>
  );
}

export default FormPage;
