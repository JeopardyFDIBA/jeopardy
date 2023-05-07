import styles from './Flipper.module.scss';
import IFlipper from './IFlipper';

function Flipper({
  id,
  score,
  setActive,
  setSelectedQuestion,
  question,
  setIsInputBlocked,
  category,
}: IFlipper) {
  return (
    <div
      className={styles.flipContainer}
      data-testid={`${category}_${score}`}
      onKeyDown={() => null}
      onClick={() => {
        setActive(true);
        setSelectedQuestion({ score, question, id });
        setIsInputBlocked(true);
      }}
    >
      <div className={styles.flipper}>
        <div className={styles.front}>
          <p>
            {score}
            $
          </p>
        </div>
        <div className={styles.back}>
          <p className={styles.backText}>HINT?</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
