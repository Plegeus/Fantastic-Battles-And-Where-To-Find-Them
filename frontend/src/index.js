
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from "./App.js";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);


const REQUEST = {
  'method': 'POST',
  'headers': {
    "content-type": 'application/json'
  },
  "body": JSON.stringify({
    username: "Plegeus",
    password: "123",
  }),
}

fetch("/api", REQUEST)
  .then(res => res.json())
  .then(dat => {
    alert(dat)
  })





//ReactDOM.render(<Navigation />, document.getElementById('top_pane'));
//ReactDOM.render(<SignupWithContext/>, document.getElementById('mid'));
//ReactDOM.render(<Login />, document.getElementById('mid'));



