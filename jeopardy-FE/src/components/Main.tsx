/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from 'react-avatar';
import { data } from '../mockdata';
import styles from './Main.module.scss';
import Column from './Column';

let name = 'default';
export default function Main() {
  const ref = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080/baseURL/opening')
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
    const referance: any = ref.current;
    if (referance) referance.focus();
  }, []);
  const categories: string[] = Object.keys(data);
  const [buzzer, setBuzzer] = useState('');

  const notify = (nickname: string) => toast.success('Clicked first', {
    toastId: nickname,
    // eslint-disable-next-line react/no-unstable-nested-components
    icon: ({ theme, type }) => <Avatar round name={name} />,
  });

  const handleKeyDown = (event:any) => {
    toast.clearWaitingQueue();
    if (!toast.isActive(name)) {
      switch (event.key) {
        case '1': name = 'Aleksey Svistunov'; notify(name); setBuzzer('#a62a21'); break;
        case '2': name = 'Antonina Yordanova'; notify(name); setBuzzer('#b3003c'); break;
        case '3': name = 'Kaloyan Enev'; notify(name); setBuzzer('#3a6024'); break;
        case '4': name = 'Vasil Fartsov'; notify(name); setBuzzer('#0b51c1'); break;
        default: break;
      }
    }
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
