import styles from './HomePage.module.scss';
import OptionsList from '../../components/OptionsList/OptionsList';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to Jeopardy!</h1>
      <OptionsList />
    </div>
  );
}

export default HomePage;
