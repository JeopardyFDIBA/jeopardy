import { useEffect, useState } from 'react';
import axios from 'axios';
import Flipper from './Flipper';
import styles from './Column.module.scss';

interface IProps {
  id: number,
  actualQuestion: string,
  score: number
}

function Column({ category }:{ category: string }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get(`http://localhost:8080/baseURL/question/${category}`)
      .then((response) => setQuestions(response.data));
  }, [category]);
  const column: JSX.Element[] = [];
  questions.map((elem: IProps) => (
    column.push(<Flipper key={elem.id} question={`${elem.score}$`} answer={elem.actualQuestion} />)
  ));
  return (
    <div style={{ display: 'block', maxWidth: '230px' }}>
      <div className={styles.header}>{category}</div>
      <div>{column}</div>
    </div>
  );
}

export default Column;
