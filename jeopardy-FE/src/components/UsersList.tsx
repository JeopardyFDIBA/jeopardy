/* eslint-disable react/no-array-index-key */
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UsersList.module.scss';
import colors from '../helpers/colors';
import { maxInitials } from '../helpers/helpConstants';
import { IPLayer } from '../sharedInterfaces';

function UsersList({ reload }: { reload: boolean }) {
  const [players, setPlayers] = useState<IPLayer[]>([]);
  const avatarColors: string[] = [];
  Object.values(players).forEach((val: IPLayer, i) => {
    avatarColors.push(colors[i]);
  });
  useEffect(() => {
    axios
      .get('http://localhost:8080/players')
      .then((response) => setPlayers(response.data));
  }, [reload]);

  return (
    <div className={styles.wrapperList}>
      {players.map((user: IPLayer, index: number) => (
        <div key={index}>
          <Avatar
            key={index}
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
