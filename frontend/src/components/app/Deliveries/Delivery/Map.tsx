import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HiLocationMarker } from 'react-icons/hi';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import RoutingMachine from './RoutingMachine';

const GMap = () => {
  const position: any = [49.0068901, 8.4036527];

  return (
    <>
      <div className='py-4 h-screen w-full'>
        <h1>Positionsübersicht</h1>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <RoutingMachine />
        </MapContainer>
      </div>
    </>
  );
};
export default GMap;
