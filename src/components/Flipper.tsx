import './Flipper.scss';

function Flipper(props: any) {
//   const { data } = props;
//   const question = Object?.keys(data[0])[0];
//   const answer = data[question];

  return (
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          <p>Hello</p>
        </div>
        <div className="back">
          <p>There</p>
        </div>
      </div>
    </div>
  );
}

export default Flipper;
