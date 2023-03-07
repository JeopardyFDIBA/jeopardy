import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import UsersList from './components/UsersList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header title="Welcome to Jeopardy" />} />
        <Route path="/test" element={<UsersList />} />
        <Route path="/game" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
