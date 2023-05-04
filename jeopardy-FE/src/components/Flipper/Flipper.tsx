/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Flipper.module.scss';
import IFlipper from './IFlipper';

function Flipper({
  id,
  score,
  setActive,
  setSelectedQuestion,
  question,
  setIsInputBlocked,
  category,
}: IFlipper) {
  return (
    <div
      className="flip-container"
      data-testid={`${category}_${score}`}
      onClick={() => {
        setActive(true);
        setSelectedQuestion({ score, question, id });
        setIsInputBlocked(true);
        localStorage.setItem('category', category);
      }}
    >
      <div className="flipper">
        <div className="front">
          <p>
            {score}
            $
          </p>
        </div>
        <div className="back">
          <p className="backText">HINT?</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
