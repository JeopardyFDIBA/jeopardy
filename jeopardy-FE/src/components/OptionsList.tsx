import { OptionsLinkItem } from './OptionsItem';
import styles from './OptionsList.module.scss';

function OptionsList() {
  return (
    <div className={styles.optionsContainer}>
      <OptionsLinkItem destination="/highscores" title="Highscores" />
      <OptionsLinkItem destination="/game-init" title="Get Started" />
      <OptionsLinkItem destination="/playground" title="Playground" />
    </div>
  );
}

export default OptionsList;
