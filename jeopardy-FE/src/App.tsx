import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersList from './components/UsersList';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<UsersList />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
