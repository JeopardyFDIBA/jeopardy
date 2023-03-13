/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { data } from '../mockdata';
import styles from './Main.module.scss';
import Column from './Column';
import Avatar from 'react-avatar';

export default function Main() {
  const ref = useRef(null);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
  }, []);
  const categories: string[] = Object.keys(data);
  const [buzzer, setBuzzer] = useState('');

  const notify = () => toast.success("Clicked first", {
    icon: ({theme, type}) =>  <Avatar round name="Aleksey Svistunov" />
  });
  

  const handleKeyDown = (event:any) => {
    notify();
    toast.clearWaitingQueue();
  };

  return (
    <div className={styles.wrapper}>
       <ToastContainer limit={1} />
      <div className={styles.questionsField} style={{ backgroundColor: buzzer || '#0c0734' }} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
        <div className={styles.questions}>
          {categories.map((elem:string, index: number) => (
            <Column key={index} category={elem} />
          ))}
        </div>
      </div>
    </div>
  );
}
