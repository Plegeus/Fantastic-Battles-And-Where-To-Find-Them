
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from "./App.js";
import AppRefresh from './AppRefresh.js';

import video from './resources/videos/016708093-world-war-ii-color-footage-b24.mp4'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppRefresh/>);


const Test = () => {

  function login() {
    fetch("/user/login", {
            "method": "POST",
            "headers": { 
                "content-type": "application/json" 
            },
            "body": JSON.stringify({
                mailaddress: document.querySelector('#mailaddress').value,
                password: document.querySelector('#psw').value,
            }),
        })
        .then(res => res.json())
        .then(dat => {
          if (dat) {
            alert(dat.token)
            alert(dat.username)
          } else {

          }
        })
  }

  return <div>
    <input id='mailaddress' type='email'></input>
    <input id='psw' type='email'></input>
    <input type='button' onClick={ login }></input>
  </div>
}
/*
fetch("/api/user/refresh/Plegeus",  {
  'method': 'GET'
})
*/


//fetch("/user/names", {
//  'method': "GET"
//}).then(res => res.json()).then(dat => {
//  alert(dat)
//})
//
//fetch("/account/refresh", {
//  'method': 'POST'
//})

//ReactDOM.render(<Navigation />, document.getElementById('top_pane'));
//ReactDOM.render(<SignupWithContext/>, document.getElementById('mid'))ß;
//ReactDOM.render(<Login />, document.getElementById('mid'));



