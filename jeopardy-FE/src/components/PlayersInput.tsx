/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'primereact/button';

function PlayersInput() {
  return (
    <div className="form-group">
      <label htmlFor="player">Enter the number of players</label>
      <input
        className="form-control"
        id="player"
        name="player"
        type="text"
        placeholder="Enter player"
      />
    </div>
  );
}

export default PlayersInput;
