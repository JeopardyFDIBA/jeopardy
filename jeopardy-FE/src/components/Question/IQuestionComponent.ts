import { Dispatch, SetStateAction } from 'react';
import { IQuestion } from '../../sharedInterfaces';

export default interface IQuestionComponent {
  setActive: Dispatch<SetStateAction<boolean>>;
  questionObject: IQuestion | undefined;
  isInputBlocked: boolean;
  setBuzzer: Dispatch<SetStateAction<string>>;
  setAnswer: Dispatch<SetStateAction<string>>;
}
