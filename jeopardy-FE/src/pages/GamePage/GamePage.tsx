import { useState } from 'react';
import { Main } from '../../components/Main/Main';
import UsersList from '../../components/UsersList/UsersList';

function GamePage() {
  const [shouldReload, setShouldReload] = useState(false);
  return (
    <div>
      <UsersList reload={shouldReload} />
      <Main reload={shouldReload} setReload={setShouldReload} />
    </div>
  );
}

export default GamePage;
