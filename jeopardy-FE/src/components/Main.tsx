/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import axios from 'axios';
import colors from '../helpers/colors';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Main.module.scss';
import Column from './Column';
import Question from './Question';
import players from '../helpers/players';

export default function Main() {
  const ref = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{ score: string, question: string }>();
  const [buzzer, setBuzzer] = useState('');
  const [isInputBlocked, setIsBlockedInput] = useState(true);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get('http://localhost:8080/baseURL/category')
      .then((response) => setCategories(response.data));
  }, []);

  const notify = (nickname: string, color?: string) => toast.success('Clicked first', {
    toastId: nickname,
    icon: () => <Avatar round name={nickname} color={color} />,
  });

  const handleKeyDown = (event:any) => {
    toast.clearWaitingQueue();
    const { name } = players[`player${event.key - 1}`];
    if (!toast.isActive(name)) {
      if ((event.key >= 1 || event.key <= 9)) {
        notify(name, colors[event.key - 1]);
        setBuzzer(colors[event.key - 1]);
      }
      setIsBlockedInput(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer limit={1} />
      <div className={styles.questionsField} style={{ backgroundColor: buzzer || '#0c0734' }} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
        {!isActive ? (
          <div className={styles.questions}>
            {categories.map((elem:string, index: number) => (
              <Column
                key={index}
                category={elem}
                setActive={setIsActive}
                setSelectedQuestion={setSelectedQuestion}
                setIsInputBlocked={setIsBlockedInput}
              />
            ))}
          </div>
        ) : (
          <Question
            isInputBlocked={isInputBlocked}
            setActive={setIsActive}
            questionObject={selectedQuestion}
            setBuzzer={setBuzzer}
          />
        )}
      </div>
    </div>
  );
}
