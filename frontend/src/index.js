
import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './components/NavBar/Navigation'
import SignupWithContext from "./components/Signup/SignupWithContext"
import Login from "./components/Login/Login"
import App from "./App.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


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



