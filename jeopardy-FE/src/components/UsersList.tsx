/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import Avatar from 'react-avatar';
import styles from './UsersList.module.scss';
import colors from '../helpers/colors';
import players from '../helpers/players';
import { maxInitials } from '../helpers/helpConstants';

function UsersList() {
  const users: any = [];
  const avatarColors: string[] = [];
  Object.values(players).forEach((val:any, i) => {
    avatarColors.push(colors[i]);
    users.push(val);
  });

  return (
    <div className={styles.wrapperList}>
      {users.map((element: { score: number, name: string }, index: number) => (
        <Avatar
          key={index}
          round
          name={element.name}
          maxInitials={maxInitials}
          color={avatarColors[index]}
        />
      ))}
    </div>
  );
}

export default UsersList;
