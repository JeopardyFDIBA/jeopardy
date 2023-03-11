import { data } from '../mockdata';
import Flipper from './Flipper';

interface IProps {
  id: number,
  question: string,
  answer: string
}

function Column({ category }:{ category: string }) {
  const column: JSX.Element[] = [];
  data[category].map((elem: IProps) => (
    column.push(<Flipper key={elem.id} question={elem.question} answer={elem.answer} />)
  ));
  return (
    <div style={{ display: 'block', maxWidth: '230px' }}>
      <h2>Question category</h2>
      <div>{column}</div>
    </div>
  );
}

export default Column;
