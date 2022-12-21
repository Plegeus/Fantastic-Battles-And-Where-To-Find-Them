import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "../../resources/pictures/grey-marker-icon.png"
import { Icon, marker } from 'leaflet'
import './map.css'
import UserContext from '../User.context';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';
import MapFilterContext from './MapFilter.context';
import { createRoot } from 'react-dom/client';

const FULL_SCREEN = {
  x0: -180,
  x1: 180,
  y0: 85,
  y1: -85,
}

const outerBounds = [
  [-90, -180],
  [90, 180],
]
const rectangle = [
  [-90, -180],
  [90, 180],
]

const Mark = ({ x, y, title, description, id }) => {
  return (
    <Marker position={[y, x]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
      <Popup>
        <Link to={`/BattlePage/${id}`}>
          {title}
          <br />
          {description ? description : "no description"}
          <br />
          Click for more info
        </Link>
      </Popup>
    </Marker>
  )
}
const MARKERS = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 30 }
]


const Map = (props) => {

  const { Accestoken, Username } = useContext(UserContext);
  const { minDeath, minYear, setminDeath, setminYear } = useContext(MapFilterContext);
  const [FilteredFetchedData, setFilteredFetchedData] = useState(false)
  /*useEffect(() => {
    fetch("/api/battles/filter", {
      'method': 'POST',
      'headers': {
        'content-type': 'application/json',
      },
      'body': JSON.stringify({
        coords: FULL_SCREEN,
        deaths: minDeath,
        date: minYear/*
        date: get("dateFilter"),
        date: get("dateFilter")
      })
    }).then(res => {
      if (!res.ok) {
        alert("Could not fetch the ffsfsdfsdfsdf")
      }
      return res.json();
    })
      .then(data => {
        setFilteredFetchedData(data)
      })
  }, [minDeath], [minYear])*/


  var mayAdd = false;
  var currentMarker;

  function showAddScreen() {
    var pane = document.getElementById('add_battle_pane');
    if (pane.style.display == 'block') {
      pane.style.display = 'none';
      mayAdd = false;
    } else {
      pane.style.display = 'block';
      mayAdd = true;
    }
  }

  function showFilterScreen() {
    var pane = document.getElementById('add_filter_pane');
    if (pane.style.display == 'block') {
      pane.style.display = 'none';
    } else {
      pane.style.display = 'block';
    }
  }
  

  function filterData() {
    var pane = document.getElementById("add_filter_pane");
    const form = document.getElementById('filterform');

    let filter = {

    }

    function get(id) {
      return form.elements[id].value
    }

    if (get("deathFilter")) {
      const deaths = get("deathFilter")
      //setminDeath(deaths);
      filter.deaths = deaths
    }
    if (get("dateFilter")) {
      const year = get("deathFilter")
      //setminYear(year);
      filter.date = year
    }
    //root.render(<AppRefresh />);
    props.func(filter)
  }

  function submitFunction() {
    var pane = document.getElementById("add_battle_pane");
    const form = document.getElementById('addBattle');

    function get(id) {
      return form.elements[id].value
    }

    if (form.elements["name"].value != '' && form.elements["lat"].value != '' && form.elements["lng"].value != '') {

      let body = {
        battlename: get('name'),
        location_x: get('lng'),
        location_y: get('lat'),
        date: get('date'),
        winning_faction: get('victor'),
        winning_commander: get('victorious_commander'),
        winning_deaths: get('victorious_deaths'),
        losing_faction: get('vanquished'),
        losing_commander: get('vanquished_commander'),
        losing_deaths: get('vanquished_deaths'),
      }

      fetch(`/api/account/${Username}/battle/add`, {
        'method': 'POST',
        'headers': {
          'content-type': 'application/json',
          "Authorization": `Bearer ${Accestoken}`,
        },
        'body': JSON.stringify(body),
      })

      var log = ("Name:" + form.elements["name"].value + " - Victor:" + form.elements["victor"].value + " - Vanquished:" + form.elements["vanquished"].value + " - Victorious Commander:" + form.elements["victorious_commander"].value + " - Vanquished Commander:" + form.elements["vanquished_commander"].value + " - Victorious Deaths:" + form.elements["victorious_deaths"].value + " - Vanquished Deaths: " + form.elements["vanquished_deaths"].value + form.elements["lat"].value + form.elements["lng"].value)
      console.log(log);
      pane.style.display = 'none';

    }
  }

  console.log("filter:", props.filter)
  const { FetchedData, isLoading, Error } = useFetch("/api/battles/filter/map", {
    'method': 'POST',
    'headers': {
      'content-type': 'application/json',
    },
    'body': JSON.stringify(
      props.filter
    )
  })

  return (
    <div className='mapContainer' id="Map">

      <div id="center">
        <div id="center_pane"></div>
        {Accestoken && <button id="battleButton" onClick={showAddScreen}>Add a battle</button>}

      </div>
      <button id="filterButton" onClick={showFilterScreen}>Filter</button>

      <div id="add_filter_pane">

        <form onSubmit={filterData} id="filterform">

          <label htmlFor="name">Min Deaths:</label><br></br>
          <input className='textField' type="number" id="deathFilter" name="name" min="0" /><br></br>
          <label htmlFor="date">From Year:</label><br></br>
          <input className='textField' type="number" id="dateFilter" name="date" min="0" /><br></br>
          <label htmlFor="victor">Faction:</label><br></br>
          <input className='textField' type="text" id="factionFilter" name="victor" /><br></br>
          <label htmlFor="vanquished">Rating:</label><br></br>
          <input className='textField' type="number" id="ratingFilter" name="vanquished" min="0" /><br></br>

          <input id="submitFilterButton" type="submit" value="Filter"></input>
        </form>
      </div>

      <div id="add_battle_pane">

        <form onSubmit={submitFunction} id="addBattle">

          <label htmlFor="name">Name:</label><br></br>
          <input className='textField' type="any" id="name" name="name" required /><br></br>
          <label htmlFor="name">Date:</label><br></br>
          <input className='textField' type="date" id="date" name="date" /><br></br>
          <label htmlFor="victor">Victor:</label><br></br>
          <input className='textField' type="any" id="victor" name="victor" /><br></br>
          <label htmlFor="vanquished">Vanquished:</label><br></br>
          <input className='textField' type="any" id="vanquished" name="vanquished" /><br></br>
          <label htmlFor="victorious_commander">Victorious Commander:</label><br></br>
          <input className='textField' type="any" id="victorious_commander" name="victorious_commander" /><br></br>
          <label htmlFor="vanquished_commander">Vanquished Commander:</label><br></br>
          <input className='textField' type="any" id="vanquished_commander" name="vanquished_commander" /><br></br>
          <label htmlFor="victorious_deaths">Victorious Deaths:</label><br></br>
          <input className='textField' type="number" id="victorious_deaths" name="victorious_deaths" /><br></br>
          <label htmlFor="vanquished_deaths">Vanquished Deaths:</label><br></br>
          <input className='textField' type="number" id="vanquished_deaths" name="vanquished_deaths" /><br></br>

          <label htmlFor="lat">Lat:</label><br></br>
          <input className='textField' type="number" step="0.0000000000000001" id="lat" name="lat" required /><br></br>
          <label htmlFor="lng">Lng:</label><br></br>
          <input className='textField' type="number" step="0.0000000000000001" id="lng" name="lng" required /><br></br>
          <input id="submitButton" type="submit" value="Submit"></input>
        </form>
      </div>

      <MapContainer center={[50, 0]} zoom={3} style={{ height: 'calc(100vh - 5rem)', width: '100vw' }} maxBounds={outerBounds} minZoom={3} >

        <TileLayer
          url='https://api.maptiler.com/maps/voyager-v2/{z}/{x}/{y}.png?key=v21B0xhC8tSTZGn1gUwV'

          style={{ height: '100%', width: '100%' }}

        />

        <Rectangle id='rect' bounds={rectangle} eventHandlers={{
          click: (e) => {
            document.getElementById("lat").value = e.latlng.lat;
            document.getElementById("lng").value = e.latlng.lng;
          },
        }} color='transparent'>
          {FilteredFetchedData && FilteredFetchedData.map((b) => (
            <Mark key={b.id} x={b.location_x} y={b.location_y} title={b.battlename} description={b.description} id={b.id} />
          ))}
          {FetchedData && !FilteredFetchedData && FetchedData.map((b) => (
            <Mark key={b.id} x={b.location_x} y={b.location_y} title={b.battlename} description={b.description} id={b.id} />
          ))}
        </Rectangle>

      </MapContainer>

    </div>
  )
}

export default Map