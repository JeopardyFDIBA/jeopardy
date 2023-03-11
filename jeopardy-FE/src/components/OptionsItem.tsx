import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import styles from './OptionsItem.module.scss';
import StyledStuff from './StyledStuff';

interface IOptionsLinkItem {
  title: string;
  destination: string;
}
interface IOptionsButtonItem {
  title: string;
  onClick: () => void;
}

export function OptionsLinkItem({ destination, title } : IOptionsLinkItem) {
  return (
    <Link to={destination} className={styles.button}>
      <StyledStuff title={title} />
    </Link>
  );
}

export function OptionsButtonItem({ title, onClick } : IOptionsButtonItem) {
  return (
    <Button className={styles.button} onClick={onClick}>
      <StyledStuff title={title} />
    </Button>
  );
}
