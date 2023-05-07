import { useState } from 'react';
import NumberInput from '../components/NumberInput/NumberInput';
import PlayersForm from '../components/PlayersForm/PlayersForm';

function FormPage() {
  const [number, setNumber] = useState('1');
  const [isReady, setIsReady] = useState(false);
  const handleStepChange = () => {
    if (!isReady) setIsReady(true);
    else setIsReady(false);
  };

  return (
    <div>
      {!isReady && (
        <NumberInput
          setNumber={setNumber}
          handleStepChange={handleStepChange}
        />
      )}
      {isReady && (
        <PlayersForm number={number} onStepChange={handleStepChange} />
      )}
    </div>
  );
}

export default FormPage;
