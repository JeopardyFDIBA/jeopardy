/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { data } from '../mockdata';
import styles from './Main.module.scss';
import Column from './Column';

export default function Main() {
  const ref = useRef(null);

  useEffect(() => {
    const referance: any = ref.current;
    if (referance) referance.focus();
  }, []);
  const categories: string[] = Object.keys(data);
  const [buzzer, setBuzzer] = useState('');

  const handleKeyDown = (event:any) => {
    const message = `User ${event.key} pressed first`;
    switch (event.key) {
      case '1': setBuzzer('#a62a21'); alert(message); break;
      case '2': setBuzzer('#b3003c'); alert(message); break;
      case '3': setBuzzer('#3a6024'); alert(message); break;
      case '4': setBuzzer('#0b51c1'); alert(message); break;
      default: break;
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* <Sidebar /> */}
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
