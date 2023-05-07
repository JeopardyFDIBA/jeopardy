import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import avatarColors from '../../helpers/avatarColors';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Main.module.scss';
import QuestionsMatrix from '../QuestionsMatrix/QuestionsMatrix';
import { IPlayer, IQuestion } from '../../sharedInterfaces';
import Question from '../Question/Question';
import { getCategories, getOpening, getPlayers } from '../../services';

export function Main({
  reload,
  setReload,
}: {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();
  const [buzzer, setBuzzer] = useState('');
  const [isInputBlocked, setIsInputBlocked] = useState(true);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [openingQuestion, setOpeningQuestion] = useState<IQuestion>();
  const [shouldTryAgain, setShouldTryAgain] = useState(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [activePlayer, setActivePlayer] = useState<IPlayer>();

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await getPlayers());
    };
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories();
    fetchPlayers();
  }, []);

  useEffect(() => {
    const referance: HTMLDivElement | null = ref.current;
    if (referance) referance.focus();
    getOpening().then((opening) => {
      setOpeningQuestion(opening);
    });
  }, [shouldTryAgain]);

  const notify = (nickname: string, color?: string) => toast.success('Clicked first', {
    toastId: nickname,
    // eslint-disable-next-line react/no-unstable-nested-components
    icon: () => <Avatar round name={nickname} color={color} />,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (+event.key >= 1 && +event.key <= 9) {
      toast.clearWaitingQueue();
      const playerIndex = +event.key - 1;
      const { name } = players[playerIndex];
      if (!toast.isActive(name)) {
        if ((+event.key >= 1 || +event.key <= 9)) {
          notify(name, avatarColors[playerIndex]);
          setBuzzer(avatarColors[playerIndex]);
          setActivePlayer(players[playerIndex]);
        }
        setIsInputBlocked(false);
      }
    }
  };

  const sharedQuestionProps = {
    activePlayer,
    isInputBlocked,
    setActive: setIsActiveQuestion,
    setBuzzer,
    reload,
    setReload,
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer limit={1} />
      <div className={styles.questionsField} style={{ backgroundColor: buzzer || '#0c0734' }} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}>

        {
         // eslint-disable-next-line no-nested-ternary
         hasGameStarted ? (!isActiveQuestion ? (
           <QuestionsMatrix
             categories={categories}
             setActive={setIsActiveQuestion}
             setIsInputBlocked={setIsInputBlocked}
             setSelectedQuestion={setSelectedQuestion}
           />
         ) : (
           <Question
             {...sharedQuestionProps}
             questionObject={selectedQuestion}
           />
         )) : (
           <Question
             {...sharedQuestionProps}
             questionObject={openingQuestion}
             setHasGameStarted={setHasGameStarted}
             setShouldTryAgain={setShouldTryAgain}
             shouldTryAgain={shouldTryAgain}
           />
         )
}
      </div>
    </div>
  );
}

export default Main;
