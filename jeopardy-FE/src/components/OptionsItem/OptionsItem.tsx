import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';
import styles from './OptionsItem.module.scss';

interface IOptionsLinkItem {
  title: string;
  destination: string;
}
interface IOptionsButtonItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

export function OptionsLinkItem({ destination, title }: IOptionsLinkItem) {
  return (
    <Link to={destination} className={styles.button}>
      <div>{title}</div>
    </Link>
  );
}

export function OptionsButtonItem({ title, onClick }: IOptionsButtonItem) {
  return (
    <Button className={styles.button} onClick={onClick}>
      <div>{title}</div>
    </Button>
  );
}
