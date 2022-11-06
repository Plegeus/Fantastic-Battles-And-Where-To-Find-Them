
import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App"
import { useState, useEffect } from 'react'

const Counter = () => {
  
  const [counter, setCounter] = useState(0)

  useEffect(() => { 
    if (counter >= 10) {
      ReactDOM.render(<p>Counter has reached 10!</p>, document.getElementById('left'));
    } 
  }, [counter]);

  return (
    <div>
      <button onClick={ () => { setCounter(counter - 1) } }>-</button>
      <p>{ counter }</p>
      <button onClick={ () => { setCounter(counter + 1 )} }>+</button>
    </div>
  );
}


ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Counter/>, document.getElementById('left'));


