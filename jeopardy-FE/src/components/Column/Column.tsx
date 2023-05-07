import { useEffect, useState } from 'react';
import Flipper from '../Flipper/Flipper';
import styles from './Column.module.scss';
import IColumn from './IColumn';
import apiInstance from '../../services/axiosConfig';

interface IProps {
  id: number;
  actualQuestion: string;
  score: number;
}

function Column({
  category,
  setActive,
  setSelectedQuestion,
  setIsInputBlocked,
}: IColumn) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    apiInstance
      .get(`/question/${category}`)
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
      <div className={styles.columnHeader}>{category}</div>
      <div>{column}</div>
    </div>
  );
}

export default Column;
