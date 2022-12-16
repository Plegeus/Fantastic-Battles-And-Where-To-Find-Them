import React from 'react'
import "./overview-tab.css"



const Overview = () => {
  return (
    <div>
      <div id="button-div">
		<button id='btn' class="list-btn" onClick='listInator()'><i class="bi-list"> list</i></button>
		<button id='btn' class="tile-btn" onClick='tileInator()'><i class="bi-grid-fill">tiles</i></button>
    </div>
    <div class="filter"> </div> 
    <div id="list-view">
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
    <div id="tile-view" class="grid-container"></div>
    </div>
  )
}

export default Overview