import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersList from './components/UsersList';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/highscores" element={null} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/playground" element={null} />
      </Routes>
    </Router>
  );
}

export default App;
