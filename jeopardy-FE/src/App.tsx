import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import FormPage from './pages/FormPage';
import Playground from './playground/Playground';
import Highscores from './components/Highscores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/highscores" element={<Highscores />} />
        <Route path="/game-init" element={<FormPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;
