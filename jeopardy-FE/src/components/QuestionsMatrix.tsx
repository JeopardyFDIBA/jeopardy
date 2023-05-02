/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from 'react';
import Column from './Column';
import styles from './QuestionsMatrix.module.scss';
import { IQuestion } from '../sharedInterfaces';

interface IMatrix {
  categories: string[];
  setActive: Dispatch<SetStateAction<boolean>>;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
  setIsInputBlocked: Dispatch<SetStateAction<boolean>>;
}
export default function Matrix({
  categories,
  setActive,
  setSelectedQuestion,
  setIsInputBlocked,
}: IMatrix) {
  return (
    <div className={styles.questions}>
      {categories.map((category: string, index: number) => (
        <Column
          key={index}
          category={category}
          setActive={setActive}
          setSelectedQuestion={setSelectedQuestion}
          setIsInputBlocked={setIsInputBlocked}
        />
      ))}
    </div>
  );
}
