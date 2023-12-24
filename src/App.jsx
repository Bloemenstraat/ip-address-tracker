import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import LongLatContext from './misc/LongLatContext'
import { useEffect } from 'react'
import {Icon} from 'leaflet'
import MarkerSVG from './assets/icon-location.svg'

function App() {

  const [ lat, setLat ] = useState(51.505);
  const [ long, setLong ] = useState(-0.09);
  const [map, setMap] = useState(null);

  const markerIcon = new Icon ({
    iconUrl : MarkerSVG,
    iconSize : [46, 56], // size of the icon
    iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    popupAnchor : [0, -76] // point from which the popup should open relative to the iconAnchor

  })

  
  useEffect(() => {
    // TODO : Check if no bugs on startup
    if (map)
      map.setView([lat, long], 13)
    
  }, [lat, long]);

  
  return (
    <>
      <LongLatContext.Provider value={{ setLong, setLat }}>
        <SearchBar />
      </LongLatContext.Provider>

      <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={false} id="map" ref={setMap} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]} icon={markerIcon}>
          <Popup>
            Your location. <br /> (I guess...)
          </Popup>
        </Marker>
    </MapContainer>

    </>
  )
}

export default App
