/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'primereact/button';

function NumberInput({ number, handleChange, isReady }:any) {
  return (
    <div className="form-group">
      <label htmlFor="number">Enter the number of players</label>
      <input
        className="form-control"
        id="number"
        name="number"
        type="text"
        placeholder="Enter number"
        value={number}// Prop: The number input data
        onChange={handleChange}
      />
      <Button label="Next" onClick={isReady} />
    </div>
  );
}

export default NumberInput;
