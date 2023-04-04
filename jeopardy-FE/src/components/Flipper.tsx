/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import './Flipper.scss';

interface IFlipper {
  score: string,
  setActive: Dispatch<SetStateAction<boolean>>,
  setSelectedQuestion:Dispatch<SetStateAction<{
    score: string;
    question: string;
  } | undefined>>,
  question: string,
  setIsInputBlocked:Dispatch<SetStateAction<boolean>>,
}
function Flipper({
  score, setActive, setSelectedQuestion, question, setIsInputBlocked,
}:IFlipper) {
  return (
    <div
      className="flip-container"
      onClick={() => {
        setActive(true);
        setSelectedQuestion({ score, question });
        setIsInputBlocked(true);
      }}
    >
      <div className="flipper">
        <div className="front">
          <p>{score}</p>
        </div>
        <div className="back">
          <p className="backText">HINT?</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
