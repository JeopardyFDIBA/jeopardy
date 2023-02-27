import styles from './Header.module.scss';

export default function Header({ title }: { title:string }) {
  return (
    <h1 className={styles.header}>{title}</h1>
  );
}
