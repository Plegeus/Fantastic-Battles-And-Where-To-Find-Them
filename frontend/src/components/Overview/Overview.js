import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';
import "./overview-tab.css"


const Overview = () => {
  var mayAdd = false;

  /* useEffect(() => {
     fetch("/api/battles/count/0/10", {
       "method": "GET",
     })
       .then(res => res.json())
       .then(dat => {
         alert(JSON.stringify(dat[0]))
         alert(JSON.stringify(dat[1]))
       })
   }, [])*/

  const { FetchedData, IsLoading, Error } = useFetch("/api/battles/filter", {
    "method": "GET",
    "Body": {}
  })


  window.addEventListener("resize", forceTileScreen);

  function forceTileScreen() {
    if (window.innerWidth < 1000) {
      showTileScreen();
    }
  }

  function showListScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (tile.style.display == 'grid') {
      lst.style.display = 'block';
      tile.style.display = 'none';
      mayAdd = false;
    } else {
      mayAdd = true;
    }
  }

  function showTileScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (tile.style.display == 'block') {

      mayAdd = false;
    } else {
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
        <button id='btn' className="list-btn" onClick={showListScreen}>List</button>
        <button id='btn' className="tile-btn" onClick={showTileScreen}>Tile</button>

        <div className="dropdown">
          <button className="dropbtn">Type</button>
          <div className="dropdown-content">
            <a href="#" onClick={showCommanderScreen}>Commander</a>
            <a href="#" onClick={showNationScreen}>Nation</a>
            <a href="#" onClick={showPeriodScreen}>Period</a>
          </div>
        </div>
        <div id='commanders' className="dropdown">
          <button className="dropbtn">Commanders</button>
          <div className="dropdown-content">
            <a href="#">Julius Caesar</a>
            <a href="#">Rambo</a>
            <a href="#">Connect this with backend</a>
          </div>
        </div>
        <div id='nations' className="dropdown">
          <button className="dropbtn">Nations</button>
          <div className="dropdown-content">
            <a href="#">Rome</a>
            <a href="#">Gaul</a>
            <a href="#">backend</a>
          </div>
        </div>
        <div id='times' className="dropdown">
          <button className="dropbtn">Periods</button>
          <div className="dropdown-content">
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
          <tbody>
            {FetchedData && FetchedData.map((battle) => (
              <tr>
                <td><Link to={`/BattlePage/${battle.id}`}>{battle.battlename}</Link></td>
                <td>{battle.winning_faction}</td>
                <td>{battle.losing_faction}</td>
                <td>{battle.winning_commander}</td>
                <td>{battle.losing_commander}</td>
                <td>{battle.winning_deaths}</td>
                <td>{battle.losing_deaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="tileView" className="grid-container">
        {FetchedData && FetchedData.map((battle) => (
          <Link key={battle.id} to={`/BattlePage/${battle.id}`} className="grid-item">{battle.battlename}</Link>
        ))}
      </div>
    </div>
  )
}

export default Overview