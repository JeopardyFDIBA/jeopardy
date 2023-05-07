import { Dispatch, SetStateAction } from 'react';
import { IPlayer, IQuestion } from '../../sharedInterfaces';

export default interface IQuestionComponent {
  setActive: Dispatch<SetStateAction<boolean>>;
  questionObject: IQuestion | undefined;
  isInputBlocked: boolean;
  setBuzzer: Dispatch<SetStateAction<string>>;
  activePlayer: IPlayer | undefined;
  setHasGameStarted?: Dispatch<SetStateAction<boolean>>;
  setShouldTryAgain?: Dispatch<SetStateAction<boolean>>;
  shouldTryAgain?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  reload: boolean;
}
