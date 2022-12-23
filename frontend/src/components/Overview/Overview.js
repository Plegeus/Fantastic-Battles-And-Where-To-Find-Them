import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';
import "./overview-tab.css"

var allowedToSwap = true;

const Overview = () => {
  const { FetchedData, IsLoading, Error } = useFetch("/api/battles/filter/overview", {
    "method": "POST",
    "Body": {}
  })

// -------------------------------------------------------------------------------------------------------
/*
 this part makes it so that when the window resizes below a point where the table can be shown without having
 to be cropped that the button to change to the list interface is not functional anymore
 */
  window.addEventListener("resize", forceTileScreen);
  window.addEventListener("load", forceTileScreen);
  window.addEventListener('click', forceTileScreen);

  function forceTileScreen() { 
    if (window.innerWidth < 1320) {
      showTileScreen();
      allowedToSwap = false;

    } else{
      allowedToSwap = true;
    }
  }
// -------------------------------------------------------------------------------------------------------
/*
These following two functions are the functions used to change from the grid interface to the list interface.
*/
  function showListScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (allowedToSwap) {
      if (tile.style.display === 'grid') {
        lst.style.display = 'block';
        tile.style.display = 'none';
      } 
    }
  }

  function showTileScreen() {
    var tile = document.getElementById('tileView');
    var lst = document.getElementById('listView');
    if (allowedToSwap) {
      lst.style.display = 'none';
      tile.style.display = 'grid';
    }
  }
// -------------------------------------------------------------------------------------------------------
/*
These functions where the functions to change a filter button that would contain either commanders, nations
or time periods to filter on. Seeing as this did not get connected with the backend in time I have commented
it out so maybe it can be implemented later.
*/
  /*
  function showCommanderScreen() {
    var cmndrs = document.getElementById('commanders');
    var ntns = document.getElementById('nations');
    var tms = document.getElementById('times');

    cmndrs.style.display = 'block';
    ntns.style.display = 'none';
    tms.style.display = 'none';

  }
  function showSearchScreen() {
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
*/
// -------------------------------------------------------------------------------------------------------
  return (
    <div id="body">
      <div id="button-div">
        {/* These are the buttons that let you change between list and tile view*/}
        <button id='btn' className="list-btn" onClick={showListScreen}>List</button>
        <button id='btn' className="tile-btn" onClick={showTileScreen}>Tile</button>
        
        {/*
        this are the dividers and buttons that made the two extra filter buttons appear on the screen
        */}
        {/*
        <div className="dropdown">
          <button className="dropbtn">Type</button>
          <div className="dropdown-content">
            <a href="#" onClick={showCommanderScreen}>Commander</a>
            <a href="#" onClick={showSearchScreen}>Nations</a>
            <a href="#" onClick={showPeriodScreen}>Period</a>
          </div>
        </div>
        <div id='commanders' className="dropdown">
          <button className="dropbtn">Commanders</button>
          <div className="dropdown-content">
            <a href="#">WIP</a>
            <a href="#">WIP</a>
            <a href="#">WIP</a>
          </div>
        </div>
        <div id='nations' className="dropdown">
          <button className="dropbtn">Nations</button>
          <div className="dropdown-content">
            <a href="#">WIP</a>
            <a href="#">WIP</a>
            <a href="#">WIP</a>
          </div>
        </div>
        <div id='times' className="dropdown">
          <button className="dropbtn">Periods</button>
          <div className="dropdown-content">
            <a href="#">Prehistory   (WIP)</a>
            <a href="#">Antiquity    (WIP)</a>
            <a href="#">Middle Ages  (WIP)</a>
            <a href="#">Renaissance  (WIP)</a>
            <a href="#">New Times    (WIP)</a>
            <a href="#">Newest Times (WIP)</a>
            <a href="#">Own Times    (WIP)</a>
          </div>
        </div>
        */}
      </div>
{ /* // ------------------------------------------------------------------------------------------------------- */}
{ /* These are the dividers on which the list and grid view are shown.*/}
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
              <tr key={battle.id}>
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