
import React from "react";
import ReactDOM from "react";

import { send, receive } from './../messages/request'

const Top = () => {

  function login() {

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    
  
    send("/api/login", {
      username: username,
      password: password,
    });
  
  }

  const element = 
    <div id="top_pane">
      <ul>
        <li>
          <input id="username" type="text" placeholder="username"></input>
        </li>
        <li>
          <input id="password" type="text" placeholder="password"></input>
        </li>
      </ul>
      <button onClick={ login }>Login</button>
    </div>
  
  return element;
}


export default Top;



