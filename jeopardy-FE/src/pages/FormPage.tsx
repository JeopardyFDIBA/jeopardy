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

  return (
    <div>
      {!isReady
      && (
      <NumberInput
        number={number}
        handleChange={handleNumberChange}
        isReady={handleStepChange}
      />
      )}
      {isReady && (
      <PlayersForm
        number={number}
        onStepChange={handleStepChange}
      />
      )}
    </div>
  );
}

export default FormPage;
