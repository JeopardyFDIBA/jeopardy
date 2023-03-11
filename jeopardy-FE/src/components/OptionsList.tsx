import OptionsItem from './OptionsItem';
import styles from './OptionsList.module.scss';

function OptionsList() {
  return (
    <div className={styles.optionsContainer}>
      <OptionsItem destination="/highscores" title="Highscores" />
      <OptionsItem destination="/game-init" title="Get Started" />
      <OptionsItem destination="/playground" title="Playground" />
    </div>
  );
}

export default OptionsList;
