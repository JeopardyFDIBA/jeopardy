/* eslint-disable @typescript-eslint/naming-convention */
import './App.css';
import Flipper from './components/Flipper';
import Header from './components/Header';

function App() {
  const data = {
    Reddit: [
      { 'This sub has the most subscribers': '/r/askReddit, with 17,478,021' },
      { 'This is the name of Reddits mascot': 'Snoo' },
      { '$5.00': 'What is the cost of Reddit Gold' },
      { 'What year was Reddit created?': '2005' },
      { 'Why am I doing this?': 'I am bored as hell.' },
    ],
    JavaScript: [
      { '1 == true': 'true' },
      { '"" + 0 == true': 'false' },
      { 'typeof "apple" == false': 'false' },
      { '~~("apple") == false': 'true' },
      { '0.1 + 0.2 == 0.3': 'false' },
    ],
    OP: [
      { 'If mad at OP, this is who you direct critiques to': 'OPs mom' },
      { 'OP is a _____ ______ ___': 'you know it, but Im not putting it here' },
      { 'Likely cause of OPs death': 'Dying in a fire' },
      { 'The method OP used to kill you in COD': 'Camping. Filthy casual.' },
      { 'The OP is literally worse than this person': 'Hitler' },
    ],
    'Cat, or Dog?': [
      { 'Haz Cheesburger': 'cat' },
      { 'Whos a good boy?': 'dog' },
      { 'Animated tv show on Nickelodeon': 'catdog' },
      { 'Likely to chase a duck': 'cat' },
      { 'Likely to be chased by a duck': 'dog' },
    ],
    'Before & After': [
      { 'question 5': 'answer 5-1' },
      { 'question 5': 'answer 5-2' },
      { 'question 5': 'answer 5-3' },
      { 'question 5': 'answer 5-4' },
      { 'question 5': 'answer 5-5' },
    ],
  };
  const flippers: any = [];
  Object.keys(data).forEach(() => flippers.push(
    <Flipper data={data} />,
  ));
  console.log(Object.keys(data));
  return (
    <div className="App">
      <Header title="Jeopardy" />
      <div>{flippers}</div>
    </div>
  );
}

export default App;
