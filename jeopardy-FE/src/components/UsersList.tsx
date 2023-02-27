/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Avatar from 'react-avatar';
import styles from './UsersList.module.scss';

interface IProps {
  id: number,
  name: string,
}

function UsersList() {
  const users: IProps[] = [{ id: 1, name: 'Aleksey Svistunov' }, { id: 2, name: 'Antonina Yordanova' }, { id: 3, name: 'Kaloyan Enev' }, { id: 4, name: 'Vasil Fartsov' }];
  return (
    <div className={styles.wrapperList}>
      {users.map((element: { id: number, name: string }) => (
        <Avatar key={element.id} round name={element.name} />
      ))}
    </div>
  );
}

export default UsersList;
