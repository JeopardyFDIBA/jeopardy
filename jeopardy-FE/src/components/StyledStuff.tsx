import styles from './StyledStuff.module.scss';

function StyledStuff({ title } : { title: string }) {
  return (
    <>
      <div className={styles.plate} />
      <div className={styles.plate} />
      <div className={styles.plate} />
      <div className={styles.plate} />
      <div className={styles.plate} />
      <div className={styles.button__wrapper}>
        <span className={styles.button__text}>{title}</span>
      </div>
      <div className={styles.button__box}>
        <div className={styles.inner__top} />
        <div className={styles.inner__front} />
        <div className={styles.inner__bottom} />
        <div className={styles.inner__back} />
        <div className={styles.inner__left} />
        <div className={styles.inner__right} />
      </div>
    </>
  );
}

export default StyledStuff;
