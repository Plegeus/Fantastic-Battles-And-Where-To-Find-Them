import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "../../resources/pictures/grey-marker-icon.png"
import { Icon, marker } from 'leaflet'
import './map.css'
import UserContext from '../User.context';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';

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

const Mark = ({x, y, title, description, id}) => {
  return(
    <Marker position={[y, x]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
      <Popup>
        <Link to={`BattlePage/${id}`}>
          {title}
          <br/>
            {description ? description : "no description"}
          <br/> 
          Click for more info 
        </Link>
      </Popup>
    </Marker>
  )
}
const MARKERS = [
  {x: 0, y: 0},
  {x: 50, y: 0},
  {x: 50, y: 30}
]


const Map = () => {

  const { Accestoken, Username } = useContext(UserContext);

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

        fetch(`/api/account/${Username}/battle/edit`, {
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
            
            const inputs = document.querySelectorAll('#name, #victor, #vanquished, #victorious_commander, #vanquished_commander, #victorious_deaths, #vanquished_deaths, #lat, #lng');
            inputs.forEach(input => {
              input.value = '';
            });
      }
  }

  const {FetchedData, isLoading, Error} = useFetch("/api/battles/filter", {
    'method': 'POST',
    'headers': {
      'content-type': 'application/json',
    },
    'body': JSON.stringify({
      coords: FULL_SCREEN
    })
  })

  return (
    <div className='mapContainer'>

      <div id="center">
        <div id="center_pane"></div>
         {Accestoken && <button id="battleButton" onClick={showAddScreen}>Add a battle</button>} 
      </div>

      <div id="add_battle_pane">

        <form onSubmit={submitFunction} id="addBattle" action='action_page.php'>

          <label htmlFor="name">Name:</label><br></br>
          <input className='textField' type="any" id="name" name="name" required/><br></br>
          <label htmlFor="name">Date:</label><br></br>
          <input className='textField' type="date" id="date" name="date" /><br></br>
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
          <input className='textField' type="number" id="lat" name="lat"  required/><br></br>
          <label htmlFor="lng">Lng:</label><br></br>
          <input className='textField' type="number" id="lng" name="lng"  required/><br></br>
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
          {FetchedData && FetchedData.map((b) => (
            <Mark key={b.id} x={b.location_x} y={b.location_y} title={b.battlename} description={b.description} id={b.id}/>
          ))}
        </Rectangle>

      </MapContainer>

    </div>
  )
}

export default Map