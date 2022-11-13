
import { useState } from "react";



function App() {

  const [data, setData] = useState({});
  const [counter, setCounter] = useState(0);

  function get() {
    fetch("/api")
      .then(
        response => response.json() // "unpack" the received data...
      )
      .then(
        data => setData(data) // read the json file...
      )
    alert(data.hello);    
  }
  function post() {
    setCounter(counter + 1);
    fetch(
      "/api",
      {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify({
          "counter": counter
        }),
      }  
    );
  }

  return( 
    <div>
      <button onClick={ get }>Click Me!</button>
      <button onClick={ post }>{counter}</button>
    </div>
  )
}


export default App;

