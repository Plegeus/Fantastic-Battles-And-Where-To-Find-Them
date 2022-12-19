import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "../../resources/pictures/grey-marker-icon.png"
import { Icon } from 'leaflet'
import './map.css'
import UserContext from '../User.context';
import { useContext } from "react";
import { Link } from 'react-router-dom';

const outerBounds = [
  [-90, -180],
  [90, 180],
]
const rectangle = [
  [-90, -180],
  [90, 180],
]

const Mark = ({x, y, title='no title', description='no description'}) => {
  return(
    <Marker position={[x, y]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
      <Popup>
        <Link to={`BattlePage/${title}`}>{title}<br/>{description}<br/> Click for more info </Link>
      </Popup>
    </Marker>
  )
}
const MARKERS = [
  {x: 0, y: 0},
  {x: 50, y: 0},
  {x: 50, y: 30}
]


function Map() {

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
  function submitFunction() {
    var pane = document.getElementById("add_battle_pane");
      const form = document.getElementById('addBattle');
      if (form.elements["name"].value != '' && form.elements["lat"].value != ''){
      var log = ("Name:" + form.elements["name"].value + " - Victor:" + form.elements["victor"].value + " - Vanquished:" + form.elements["vanquished"].value + " - Victorious Commander:" + form.elements["victorious_commander"].value + " - Vanquished Commander:" + form.elements["vanquished_commander"].value + " - Victorious Deaths:" + form.elements["victorious_deaths"].value + " - Vanquished Deaths: " + form.elements["vanquished_deaths"].value + form.elements["lat"].value + form.elements["lng"].value)
            console.log(log);
            pane.style.display = 'none';
            
            const inputs = document.querySelectorAll('#name, #victor, #vanquished, #victorious_commander, #vanquished_commander, #victorious_deaths, #vanquished_deaths, #lat, #lng');
            inputs.forEach(input => {
              input.value = '';
            });
      }
  }

  const { Accestoken } = useContext(UserContext);
  return (
    <div className='mapContainer'>

      <div id="center">
        <div id="center_pane"></div>
         {true && <button id="battleButton" onClick={showAddScreen}>Add a battle</button>} 
      </div>



      <div id="add_battle_pane">

        <form id="addBattle" action='action_page.php'>

          <label htmlFor="name">Name:</label><br></br>
          <input className='textField' type="any" id="name" name="name" /><br></br>
          <label htmlFor="victor">Victor:</label><br></br>
          <input className='textField' type="any" id="victor" name="victor"/><br></br>
          <label htmlFor="vanquished">Vanquished:</label><br></br>
          <input className='textField' type="any" id="vanquished" name="vanquished"/><br></br>
          <label htmlFor="victorious_commander">Victorious Commander:</label><br></br>
          <input className='textField' type="any" id="victorious_commander" name="victorious_commander"/><br></br>
          <label htmlFor="vanquished_commander">Vanquished Commander:</label><br></br>
          <input className='textField' type="any" id="vanquished_commander" name="vanquished_commander"/><br></br>
          <label htmlFor="victorious_deaths">Victorious Deaths:</label><br></br>
          <input className='textField' type="number" id="victorious_deaths" name="victorious_deaths"/><br></br>
          <label htmlFor="vanquished_deaths">Vanquished Deaths:</label><br></br>
          <input className='textField' type="number" id="vanquished_deaths" name="vanquished_deaths"/><br></br>

          <label htmlFor="lat">Lat:</label><br></br>
          <input className='textField' type="number" id="lat" name="lat"  /><br></br>
          <label htmlFor="lng">Lng:</label><br></br>
          <input className='textField' type="number" id="lng" name="lng"  /><br></br>
          <input id="submitButton" type="button" value="Submit" onClick={submitFunction}></input>
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

          {MARKERS.length > 0 && MARKERS.map((marker) => (
            <Mark x={marker.x} y={marker.y}/>
          ))}
        </Rectangle>

      </MapContainer>

    </div>
  )
}

export default Map