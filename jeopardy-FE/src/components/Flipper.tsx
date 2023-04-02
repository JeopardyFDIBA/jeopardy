/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './Flipper.scss';

function Flipper(props: any) {
  const { score, answer, setActive } = props;

  return (
    <div className="flip-container" onClick={() => setActive(true)}>
      <div className="flipper">
        <div className="front">
          <p>{score}</p>
        </div>
        <div className="back">
          <p className="backText">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
