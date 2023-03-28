import { Button } from 'primereact/button';
import styles from './Playground.module.scss';

function Playground() {
  return (
    <>
      <div className={styles.playground} />
      <p className={styles.para}>Test your React skills here</p>
      <Button label="Go Back" onClick={() => { window.location.assign('/'); }} />
    </>
  );
}

export default Playground;
