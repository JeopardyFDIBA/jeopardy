import { memo, useEffect, useState } from 'react';
import Flipper from '../Flipper/Flipper';
import styles from './Column.module.scss';
import IColumn from './IColumn';
import { getQuestionsByCategory } from '../../services';
import { IQuestion } from '../../sharedInterfaces';

function Column({
  category,
  setActive,
  setSelectedQuestion,
  setIsInputBlocked,
}: IColumn) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    getQuestionsByCategory(category)
      .then((response) => setQuestions(response))
      .catch((error) => console.error(error));
  }, [category]);
  const column: JSX.Element[] = [];
  questions.map((question: IQuestion) => column.push(
    <Flipper
      category={category}
      key={question.id}
      id={question.id}
      score={question.score}
      question={question.question}
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
function propsAreEqual() {
  return true;
}

export default memo(Column, propsAreEqual);
