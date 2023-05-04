import { Dispatch, SetStateAction } from 'react';
import { IQuestion } from '../../sharedInterfaces';

export default interface IFlipper {
  id: number;
  category: string;
  score: number;
  setActive: Dispatch<SetStateAction<boolean>>;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
  question: string;
  setIsInputBlocked: Dispatch<SetStateAction<boolean>>;
}
