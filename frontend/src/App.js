
import React from "react";

const App = () => {
  return( 
    <div align="center" class="vertical">

      <div class="top">
        <div class="divable" id="top">TOP</div>
      </div>
      
      <div class="horizontal">
        <div class="left">
          <div class="divable" id="left">LEFT</div>
        </div>
        <div>
          <div class="divable" id="center">CENTER</div>
        </div>
        <div class="right">
          <div class="divable" id="right">RIGHT</div>
        </div>
      </div>
      
      <div class="bottom">
        <div class="divable" id="bottom">BOTTOM</div>
      </div>
    
    </div>
  );
}

export default App;
