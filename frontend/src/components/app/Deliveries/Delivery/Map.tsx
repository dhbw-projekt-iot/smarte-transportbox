import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HiLocationMarker } from 'react-icons/hi';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';

const svgIcon = L.divIcon({
  html: `
<svg
  width="24"
  height="40"
  viewBox="0 0 100 100"
  version="1.1"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M0 0 L50 100 L100 0 Z" fill="#4338ca"></path>
</svg>`,
  className: '',
  iconSize: [24, 40],
  iconAnchor: [12, 40],
});

var greenIcon = new Icon({
  iconUrl: 'https://freesvg.org/img/map-pin.png',
  shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
});

const GMap = () => {
  const position: any = [49.01435, 8.38812];

  return (
    <>
      <div className='py-4 h-screen w-full'>
        <h3 className='pt-4 pb-3 text-lg leading-6 font-medium text-gray-900'>
          Positionsübersicht:
        </h3>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <RoutingMachine />
          <Marker position={position} icon={svgIcon} />
        </MapContainer>
      </div>
    </>
  );
};
export default GMap;
