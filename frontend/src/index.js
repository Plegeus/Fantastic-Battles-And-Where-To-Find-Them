
import React from 'react';
import ReactDOM from 'react-dom';


async function send(url, object) {
  fetch(url, {
    "method": "POST",
    "headers": { 
      "content-type": "application/json" 
    },
    "body": JSON.stringify({
      data: object,
    }),
  });
}
async function receive(url, callback) {
  fetch(url).then((res) => res.json()).then(
    (data) => callback(data)
  );
}

const App = () => {
  
  let [text, setText] = React.useState('Hello who?');

  return(
    <div id="center_pane">
      <button onClick={ () => send("/api/login", {foo: "React!"}) }>Press me!</button>
      <p> { text } </p>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('center_pane'));





