import { SetStateAction } from 'react';

export default interface INumberInput {
  handleStepChange: () => void;
  setNumber: (value: SetStateAction<string>) => void
}
