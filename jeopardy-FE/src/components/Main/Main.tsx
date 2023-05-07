/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import colors from '../../helpers/avatarColors';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Main.module.scss';
import Question from '../Question/Question';
import QuestionsMatrix from '../QuestionsMatrix/QuestionsMatrix';
import { maxTriesOnOpeningQuestion } from '../../helpers/helpConstants';
import { IPLayer, IQuestion } from '../../sharedInterfaces';
import apiInstance from '../../services/axiosConfig';

export default function Main({
  reload,
  setReload,
}: {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();
  const [buzzer, setBuzzer] = useState('');
  const [isInputBlocked, setIsInputBlocked] = useState(true);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [openingQuestion, setOpeningQuestion] = useState<IQuestion>();
  const [answer, setAnswer] = useState('');
  const [shouldTryAgain, setShouldTryAgain] = useState(
    maxTriesOnOpeningQuestion,
  );
  const [players, setPlayers] = useState<IPLayer[]>([]);
  const [activePlayer, setActivePlayer] = useState<IPLayer>();

  useEffect(() => {
    apiInstance
      .get('/category')
      .then((response) => setCategories(response.data));
    apiInstance
      .get('/players')
      .then((response) => setPlayers(response.data));
  }, []);

  useEffect(() => {
    const referance: HTMLDivElement | null = ref.current;
    if (referance) referance.focus();
    apiInstance.get('/opening').then((response) => {
      setOpeningQuestion({
        score: response.data.score,
        question: response.data.actualQuestion,
        id: response.data.id,
      });
    });
  }, [shouldTryAgain]);

  const updateScore = () => {
    apiInstance
      .post('/updatescore', {
        id: activePlayer?.id,
        score: selectedQuestion?.score,
      })
      .then(() => {
        setReload(!reload);
        localStorage.setItem('containerToBlock', `${localStorage.getItem('category')}_${selectedQuestion?.score}`);
      });
  };

  const notify = (nickname: string, color?: string) => toast.success('Clicked first', {
    toastId: nickname,
    // eslint-disable-next-line react/no-unstable-nested-components
    icon: () => <Avatar round name={nickname} color={color} />,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      apiInstance
        .post('/checkAnswer', {
          id: !hasGameStarted ? openingQuestion?.id : selectedQuestion?.id,
          answer,
        })
        .then((response) => {
          if (response.data.correct && !hasGameStarted) {
            setHasGameStarted(true);
          } else if (response.data.correct && hasGameStarted) {
            updateScore();
          } else {
            setIsInputBlocked(true);
            setShouldTryAgain(shouldTryAgain - 1);
          }
        });
    } else if (+event.key >= 1 && +event.key <= 9) {
      toast.clearWaitingQueue();
      const playerIndex = +event.key - 1;
      const { name } = players[playerIndex];
      if (!toast.isActive(name)) {
        if ((+event.key >= 1 || +event.key <= 9) && !isInputBlocked) {
          notify(name, colors[playerIndex]);
          setBuzzer(colors[playerIndex]);
          setActivePlayer(players[playerIndex]);
        }
        setIsInputBlocked(false);
      }
    }
  };

  const sharedQuestionProps = {
    isInputBlocked,
    setActive: setIsActiveQuestion,
    setBuzzer,
    setAnswer,
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer limit={1} />
      <div
        className={styles.questionsField}
        style={{ backgroundColor: buzzer || '#0c0734' }}
        ref={ref}
        tabIndex={-1}
        onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}
      >
        {isActiveQuestion ? (
          <Question
            {...sharedQuestionProps}
            questionObject={selectedQuestion}
          />
        ) : (
          <Question {...sharedQuestionProps} questionObject={openingQuestion} />
        )}
        {!isActiveQuestion && (
        <QuestionsMatrix
          categories={categories}
          setActive={setIsActiveQuestion}
          setIsInputBlocked={setIsInputBlocked}
          setSelectedQuestion={setSelectedQuestion}
        />
        )}
      </div>
    </div>
  );
}
