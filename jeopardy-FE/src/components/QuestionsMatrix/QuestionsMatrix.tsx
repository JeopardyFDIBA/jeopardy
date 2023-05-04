/* eslint-disable react/no-array-index-key */
import Column from '../Column/Column';
import styles from './QuestionsMatrix.module.scss';
import IQuestionsMatrix from './IQuestionsMatrix';

export default function Matrix({
  categories,
  setActive,
  setSelectedQuestion,
  setIsInputBlocked,
}: IQuestionsMatrix) {
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
