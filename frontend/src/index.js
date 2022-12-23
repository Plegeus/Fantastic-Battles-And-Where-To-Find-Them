
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRefresh from './AppRefresh.js';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppRefresh func={r} filter={{}} />);

function r(filter) {
  root.render(<AppRefresh func={r} filter={filter} />);
}

/*const Test = () => {

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
*/


