import { v4 as uuidv4 } from 'uuid';
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
      {categories.map((category: string) => (
        <Column
          key={uuidv4()}
          category={category}
          setActive={setActive}
          setSelectedQuestion={setSelectedQuestion}
          setIsInputBlocked={setIsInputBlocked}
        />
      ))}
    </div>
  );
}
