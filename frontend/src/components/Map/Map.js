import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import './map.css'

const outerBounds = [
  [-90, -180],
  [90, 180],
]


function Map () {
  
  return (
    <div>
      <div id="center">
        <div id="center_pane"></div>
        <button id="battleButton" >Add a battle</button>
      </div>

      
      
          <div id="add_battle_pane">
            <form id="addBattle">
              <div id="coordinate"></div>
              <label htmlFor="name">Name:</label><br></br>
              <input type="text" id="name" name="name"  required /><br></br>
              <label htmlFor="victor">Victor:</label><br></br>
              <input type="text" id="victor" name="victor" required /><br></br>
              <label htmlFor="vanquished">Vanquished:</label><br></br>
              <input type="text" id="vanquished" name="vanquished" required /><br></br>
              <label htmlFor="victorious_commander">Victorious Commander:</label><br></br>
              <input type="text" id="victorious_commander" name="victorious_commander" required /><br></br>
              <label htmlFor="vanquished_commander">Vanquished Commander:</label><br></br>
              <input type="text" id="vanquished_commander" name="vanquished_commander" required /><br></br>
              <label htmlFor="victorious_deaths">Victorious Deaths:</label><br></br>
              <input type="any" id="victorious_deaths" name="victorious_deaths" required /><br></br>
              <label htmlFor="vanquished_deaths">Vanquished Deaths:</label><br></br>
              <input type="any" id="vanquished_deaths" name="vanquished_deaths" required /><br></br>
              <br></br>
            </form> 
          </div>

      <MapContainer center={[50,0]} zoom={3}style={{ height: 'calc(100vh - 5rem)', width: '100vw' }} maxBounds={outerBounds} minZoom={2} >
        <TileLayer
          url='https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=v21B0xhC8tSTZGn1gUwV'
          style={{ height: '100%', width: '100%' }}
          eventHandlers={{
            mousemove: () => {
              console.log('marker clicked')
            },
          }}
        />
        <Marker position={[51.505, -0.09]}icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} eventHandlers={{
        click: (e) => {
        console.log('marker clicked', e)
      },
  }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

    </div>
  )
}

export default Map