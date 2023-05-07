import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import FormPage from './pages/FormPage/FormPage';
import Playground from './pages/Playground/Playground';
import HighscoresPage from './pages/HighscoresPage/HighscoresPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/highscores" element={<HighscoresPage />} />
        <Route path="/game-init" element={<FormPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;
