import { v4 as uuidv4 } from 'uuid';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import styles from './UsersList.module.scss';
import { maxInitials } from '../../helpers/helpConstants';
import { IPlayer } from '../../sharedInterfaces';
import getAvatarColors from '../../helpers/getAvatarColors';
import { getPlayers } from '../../services';

function UsersList({ reload }: { reload: boolean }) {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const avatarColors = getAvatarColors(players);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await getPlayers();
      setPlayers(response);
    };
    fetchPlayers();
  }, [reload]);

  return (
    <div className={styles.wrapperList}>
      {players.map((user: IPlayer, index: number) => (
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
