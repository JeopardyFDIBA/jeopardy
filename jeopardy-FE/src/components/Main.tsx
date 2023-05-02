/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import axios from 'axios';
import colors from '../helpers/colors';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Main.module.scss';
import Question from './Question';
import QuestionsMatrix from './QuestionsMatrix';
import { maxTriesOnOpeningQuestion } from '../helpers/helpConstants';
import { IPLayer, IQuestion } from '../sharedInterfaces';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Main({
  reload,
  setReload,
}: {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef(null);
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
  const timerRef = useRef<any | null>(null);

  useEffect(() => {
    timerRef.current! = setInterval(() => {
      alert('Time is up!');
    }, 20 * 30 * 1000);

    // clear the timer when the component unmounts
    return () => clearInterval(timerRef.current!);
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/category')
      .then((response) => setCategories(response.data));
    axios
      .get('http://localhost:8080/players')
      .then((response) => setPlayers(response.data));
  }, []);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
    axios.get('http://localhost:8080/opening').then((response) => {
      setOpeningQuestion({
        score: response.data.score,
        question: response.data.actualQuestion,
        id: response.data.id,
      });
    });
  }, [shouldTryAgain]);

  const updateScore = () => {
    axios
      .post('http://localhost:8080/updatescore', {
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
      axios
        .post('http://localhost:8080/checkAnswer', {
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
        {hasGameStarted ? (
          !isActiveQuestion ? (
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
          )
        ) : (
          <Question {...sharedQuestionProps} questionObject={openingQuestion} />
        )}
      </div>
    </div>
  );
}
