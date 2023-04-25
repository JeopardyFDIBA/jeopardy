/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import axios from 'axios';
import colors from '../helpers/colors';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Main.module.scss';
import Question from './Question';
import players from '../helpers/players';
import QuestionsMatrix from './QuestionsMatrix';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Main() {
  const ref = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{ score: string, question: string }>();
  const [buzzer, setBuzzer] = useState('');
  const [isInputBlocked, setIsBlockedInput] = useState(true);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [opening, setOpening] = useState<{ score: string, question: string, id: string }>();
  const [answer, setAnswer] = useState('');
  const [shouldTryAgain, setShouldTryAgain] = useState(20);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
    axios.get('http://localhost:8080/baseURL/category')
      .then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
    axios.get('http://localhost:8080/baseURL/opening')
      .then((response) => {
        setOpening({
          score: response.data.score,
          question: response.data.actualQuestion,
          id: response.data.id,
        });
      });
  }, [shouldTryAgain]);

  const notify = (nickname: string, color?: string) => toast.success('Clicked first', {
    toastId: nickname,
    icon: () => <Avatar round name={nickname} color={color} />,
  });

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      axios.post('http://localhost:8080/checkAnswer', {
        id: opening?.id,
        answer,
      }).then((response) => {
        if (response.data.correct) setHasGameStarted(true);
        else {
          setIsBlockedInput(true); setShouldTryAgain(shouldTryAgain - 1);
        }
      });
    } else if (event.key >= 1 && event.key <= 9) {
      toast.clearWaitingQueue();
      const { name } = players[`player${event.key - 1}`];
      if (!toast.isActive(name)) {
        if ((event.key >= 1 || event.key <= 9) && !isInputBlocked) {
          notify(name, colors[event.key - 1]);
          setBuzzer(colors[event.key - 1]);
        }
        setIsBlockedInput(false);
      }
    }
  };

  const sharedQuestionProps = {
    isInputBlocked,
    setActive: setIsActive,
    setBuzzer,
    setAnswer,
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer limit={1} />
      <div className={styles.questionsField} style={{ backgroundColor: buzzer || '#0c0734' }} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
        {hasGameStarted ? (!isActive ? (
          <QuestionsMatrix
            categories={categories}
            setActive={setIsActive}
            setIsInputBlocked={setIsBlockedInput}
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
            questionObject={opening}
          />
        )}
      </div>
    </div>
  );
}
