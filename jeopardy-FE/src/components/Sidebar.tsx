/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <div className={styles.sidebarWrapper}>
      <ul className={styles.sidebarNav}>
        <li className={styles.sidebarElem}>
          <a className={styles.link} href="https://www.w3schools.com">
            Start New Game
          </a>
        </li>
        <li className={styles.sidebarElem}>
          <a className={styles.link} href="#b">Highscores</a>
        </li>
        <li className={styles.sidebarElem}>
          <a className={styles.link} href="#c">Pause Game</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
