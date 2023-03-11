import { Link } from 'react-router-dom';
import styles from './OptionsItem.module.scss';

interface IOptionsItem {
  title: string;
  destination: string;
}

function OptionsItem({ destination, title } : IOptionsItem) {
  return (
    <Link to={destination} className={styles.button}>
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
    </Link>
  );
}

export default OptionsItem;
