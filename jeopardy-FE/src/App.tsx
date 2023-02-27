import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import UsersList from './components/UsersList';

function App() {
  return (
    <div>
      <Header title="Welcome to Jeopardy" />
      <UsersList />
      <Main />
    </div>
  );
}

export default App;
