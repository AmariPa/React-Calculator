import { useReducer } from 'react';
import './App.css';
import DigitButton from './Digit';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT: 
      return {
        ...state,
        current: `${current || ''}${payload.digit}`
      }
  }
}

function App() {
  const [{ current, previous, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc">
      <div className='output'>
        <div className='previous'>{previous} {operation}</div>
        <div className='current'>{current}</div>
      </div>
      <button className='big-button'>AC</button>
      <button>DEL</button>
      <DigitButton digit='÷' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <DigitButton digit='×' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <DigitButton digit='+' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <DigitButton digit='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='big-button'>=</button>
    </div>
  );
}

export default App;
