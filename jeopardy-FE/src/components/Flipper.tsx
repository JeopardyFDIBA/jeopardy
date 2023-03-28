/* eslint-disable @typescript-eslint/no-explicit-any */
import './Flipper.scss';

function Flipper(props: any) {
  const { question, answer } = props;

  return (
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          <p>{question}</p>
        </div>
        <div className="back">
          <p className="backText">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
