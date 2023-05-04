import { v4 as uuidv4 } from 'uuid';
import styles from './HighscoresPage.module.scss';

function Highscores() {
  const scores = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 80 },
    { name: 'Player 3', score: 60 },
    { name: 'Player 4', score: 50 },
    { name: 'Player 5', score: 40 },
  ];

  return (
    <div className={styles.highscores}>
      <h1 className={styles.title}>Highscores</h1>
      {' '}
      Top 5 Players
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={uuidv4()}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Highscores;
