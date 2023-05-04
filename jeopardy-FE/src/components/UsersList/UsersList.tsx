import { v4 as uuidv4 } from 'uuid';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import styles from './UsersList.module.scss';
import colors from '../../helpers/colors';
import { maxInitials } from '../../helpers/helpConstants';
import { IPLayer } from '../../sharedInterfaces';
import apiInstance from '../../services/axiosConfig';

function UsersList({ reload }: { reload: boolean }) {
  const [players, setPlayers] = useState<IPLayer[]>([]);
  const avatarColors: string[] = [];
  Object.values(players).forEach((val: IPLayer, i) => {
    avatarColors.push(colors[i]);
  });
  useEffect(() => {
    apiInstance
      .get('/players')
      .then((response) => setPlayers(response.data));
  }, [reload]);

  return (
    <div className={styles.wrapperList}>
      {players.map((user: IPLayer, index: number) => (
        <div key={uuidv4()}>
          <Avatar
            key={uuidv4()}
            round
            name={user.name}
            maxInitials={maxInitials}
            color={avatarColors[index]}
          />
          <div className={styles.scores}>{user.score}</div>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
