import { Dispatch, SetStateAction } from 'react';
import { IQuestion } from '../../sharedInterfaces';

export default interface IColumn {
  category: string;
  setActive: Dispatch<SetStateAction<boolean>>;
  setIsInputBlocked: Dispatch<SetStateAction<boolean>>;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
}
