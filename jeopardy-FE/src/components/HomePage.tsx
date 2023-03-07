import { Link } from 'react-router-dom';
import Header from './Header';

function HomePage() {
  return (
    <div>
      <Header title="Welcome to Jeopardy" />
      <ul>
        <li>
          <Link to="/game">Start New Game</Link>
        </li>
        <li>
          <Link to="/highscores">Highscores</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
