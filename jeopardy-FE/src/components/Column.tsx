import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import Flipper from './Flipper';
import styles from './Column.module.scss';
import { IQuestion } from '../sharedInterfaces';

interface IProps {
  id: number;
  actualQuestion: string;
  score: number;
}

interface IColumn {
  category: string;
  setActive: Dispatch<SetStateAction<boolean>>;
  setIsInputBlocked: Dispatch<SetStateAction<boolean>>;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
}

function Column({
  category,
  setActive,
  setSelectedQuestion,
  setIsInputBlocked,
}: IColumn) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .get(`http://localhost:8080/question/${category}`)
      .then((response) => setQuestions(response.data));
  }, [category]);
  const column: JSX.Element[] = [];
  questions.map((elem: IProps) => column.push(
    <Flipper
      category={category}
      key={elem.id}
      id={elem.id}
      score={elem.score}
      question={elem.actualQuestion}
      setActive={setActive}
      setSelectedQuestion={setSelectedQuestion}
      setIsInputBlocked={setIsInputBlocked}
    />,
  ));
  return (
    <div style={{ display: 'block', maxWidth: '230px' }}>
      <div className={styles.header}>{category}</div>
      <div>{column}</div>
    </div>
  );
}

export default Column;
