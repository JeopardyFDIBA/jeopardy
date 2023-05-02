/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import Main from '../components/Main';
import UsersList from '../components/UsersList';

function GamePage() {
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (localStorage?.getItem('containerToBlock')) {
      const elementToBlock = document.querySelector(`[data-testid="${localStorage?.getItem('containerToBlock')}"]`);
      // Block pointer events
      elementToBlock?.classList.add('block');
    }
  }, []);
  useEffect(() => {
    if (localStorage?.getItem('containerToBlock')) {
      const elementToBlock = document.querySelector(`[data-testid="${localStorage?.getItem('containerToBlock')}"]`);

      // Block pointer events
      elementToBlock?.classList.add('block');
      console.log(elementToBlock?.classList);
    }
  }, [reload]);
  return (
    <div>
      <UsersList reload={reload} />
      <Main reload={reload} setReload={setReload} />
    </div>
  );
}

export default GamePage;
