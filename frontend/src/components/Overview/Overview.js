import React, { useEffect } from 'react'
import "./overview-tab.css"


const Overview = () => {
  var mayAdd = false;

  useEffect(() => {
    fetch("/battles/count/0/10", {
      "method": "GET",
    })
    .then(res => res.json())
    .then(dat => {
      alert(JSON.stringify(dat[0]))
      alert(JSON.stringify(dat[1]))
    })
  }, [])


  function showListScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (tile.style.display == 'grid'){
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
      tile.style.display = 'grid';
      mayAdd = true;
    }
  } 
  function showCommanderScreen() {
    var cmndrs = document.getElementById('commanders');
    var ntns = document.getElementById('nations');
    var tms = document.getElementById('times');
   
    cmndrs.style.display = 'block';
    ntns.style.display = 'none';
    tms.style.display = 'none';
    
  } 
  function showNationScreen() {
    var cmndrs = document.getElementById('commanders');
    var ntns = document.getElementById('nations');
    var tms = document.getElementById('times');
   
    cmndrs.style.display = 'none';
    ntns.style.display = 'block';
    tms.style.display = 'none';
    
  } 
  function showPeriodScreen() {
    var cmndrs = document.getElementById('commanders');
    var ntns = document.getElementById('nations');
    var tms = document.getElementById('times');
   
    cmndrs.style.display = 'none';
    ntns.style.display = 'none';
    tms.style.display = 'block';
    
  } 
  return (
    <div id="body">
      <div id="button-div">
		    <button id='btn' class="list-btn" onClick={showListScreen}>List</button>
        <button id='btn' class="tile-btn" onClick={showTileScreen}>Tile</button>
        
        <div class="dropdown">
          <button  class="dropbtn">Type</button>
          <div  class="dropdown-content">
            <a href="#" onClick={showCommanderScreen}>Commander</a>
            <a href="#" onClick={showNationScreen}>Nation</a>
            <a href="#" onClick={showPeriodScreen}>Period</a>
          </div>
        </div>
        <div id='commanders' class="dropdown">
          <button  class="dropbtn">Commanders</button>
          <div class="dropdown-content">
            <a href="#">Julius Caesar</a>
            <a href="#">Rambo</a>
            <a href="#">Connect this with backend</a>
          </div>
        </div>
        <div id='nations' class="dropdown">
          <button class="dropbtn">Nations</button>
          <div class="dropdown-content">
            <a href="#">Rome</a>
            <a href="#">Gaul</a>
            <a href="#">backend</a>
          </div>
        </div>
        <div id='times' class="dropdown">
          <button class="dropbtn">Periods</button>
          <div class="dropdown-content">
            <a href="#">Prehistory</a>
            <a href="#">Antiquity</a>
            <a href="#">Middle Ages</a>
            <a href="#">Renaissance</a>
            <a href="#">New Times</a>
            <a href="#">Newest Times</a>
            <a href="#">Own Times</a>
          </div>
        </div>
      </div>
      
    
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
    <div id="tileView" class="grid-container">
          <a class="grid-item" href="login">Away down south</a>
          <a class="grid-item">in the land of traitors</a>
          <a class="grid-item">rattlesnakes and alligators</a>
          <a class="grid-item">right away</a>
          <a class="grid-item">come away</a>
          <a class="grid-item">right away</a>
          <a class="grid-item">come away</a>
        </div>
    </div>
    
  )
}

export default Overview