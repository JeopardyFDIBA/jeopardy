/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Avatar from 'react-avatar';
import styles from './UsersList.module.scss';

interface IProps {
  id: number,
  name: string,
}

function UsersList() {
  const players = JSON.parse(localStorage.getItem('players') || 'no players');
  const users: any = [];
  Object.values(players).forEach((val:any) => users.push(val));
  return (
    <div className={styles.wrapperList}>
      {users.map((element: { score: number, name: string }, index: number) => (
        <Avatar key={index} round name={element.name} />
      ))}
    </div>
  );
}

export default UsersList;
