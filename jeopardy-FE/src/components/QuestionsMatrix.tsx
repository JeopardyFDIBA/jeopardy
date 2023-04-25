/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from 'react';
import Column from './Column';
import styles from './QuestionsMatrix.module.scss';

interface IMatrix {
  categories: string[],
  setActive: Dispatch<SetStateAction<boolean>>,
  setSelectedQuestion:Dispatch<SetStateAction<{
    score: string;
    question: string;
  } | undefined>>,
  setIsInputBlocked:Dispatch<SetStateAction<boolean>>
}
export default function Matrix({
  categories, setActive, setSelectedQuestion, setIsInputBlocked,
}: IMatrix) {
  return (
    <div className={styles.questions}>
      {categories.map((elem:string, index: number) => (
        <Column
          key={index}
          category={elem}
          setActive={setActive}
          setSelectedQuestion={setSelectedQuestion}
          setIsInputBlocked={setIsInputBlocked}
        />
      ))}
    </div>
  );
}
