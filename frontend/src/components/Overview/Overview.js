import React from 'react'
import "./overview-tab.css"



const Overview = () => {
  var mayAdd = false;
  function showAddScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (tile.style.display == 'block'){
      lst.style.display = 'block';
      tile.style.display = 'none';
      mayAdd = false;
    }else {
      mayAdd = true;
    }
  }  
  function showTileScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (tile.style.display == 'block'){
      
      mayAdd = false;
    }else {
      lst.style.display = 'none';
      tile.style.display = 'block';
      mayAdd = true;
    }
  } 
  return (
    <div>
      <div id="button-div">
		<button id='btn' class="list-btn" onClick={showAddScreen}>List</button>
    <button id='btn' class="tile-btn" onClick={showTileScreen}>Tile</button>
    </div>
    <div class="filter"> </div> 
    <div id="listView">
      <table id="battle-table"> 
          <thead>
              <tr> 
                <th>Name</th> 
                <th>Victor</th> 
                <th>Vanquished</th> 
                <th>Victorious Commander</th> 
                <th>Vanquished Commander</th> 
                <th>Victorious deaths</th> 
                <th>Vanquished deaths</th>  
              </tr> 
          </thead>
      </table> 
    </div>
    <div id="tileView" class="grid-container"></div>
    </div>
  )
}

export default Overview