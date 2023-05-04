import { Dispatch, SetStateAction } from 'react';
import { IQuestion } from '../../sharedInterfaces';

export default interface IQuestionsMatrix {
  categories: string[];
  setActive: Dispatch<SetStateAction<boolean>>;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
  setIsInputBlocked: Dispatch<SetStateAction<boolean>>;
}
