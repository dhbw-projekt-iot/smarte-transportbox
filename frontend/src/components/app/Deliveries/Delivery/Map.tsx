import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

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
  iconAnchor: [14, 42],
});

const waypointIcon = L.divIcon({
  html: `
<svg height="100" width="100">
<circle cx="50" cy="50" r="5" fill="red" />
</svg>`,
  className: '',
  iconSize: [12, 12],
  iconAnchor: [50, 48],
});

let positionIcon = L.icon({
  iconUrl: icon,
  iconAnchor: [12, 42], // point of the icon which will correspond to marker's location
});
const GMap = ({ transportationTask }) => {
  let position: any = undefined;
  const stops: any[] = [];
  let waypoints: any[] = [];
  if (
    transportationTask.measurements &&
    transportationTask.measurements.length > 0
  ) {
    transportationTask.measurements.map((dataPoint) => {
      let waypoint = dataPoint.location.split(',');
      waypoint = waypoint.map((coordinate) => {
        return Number(coordinate);
      });
      if (!waypoint || waypoint[0] !== 0) {
        waypoints.push(waypoint);
      }
    });

    position =
      transportationTask.measurements[
        transportationTask.measurements.length - 1
      ].location.split(',');
    position = position.map((coordinate) => {
      return Number(coordinate);
    });

    position =
      transportationTask.measurements[
        transportationTask.measurements.length - 1
      ].location.split(',');
    if (!position || position[0] !== 0) {
      stops.push(
        position.map((coordinate) => {
          return Number(coordinate);
        }),
      );
    }
  }

  if (position[0] === '') {
    position = [49.02728, 8.38585];
  }

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

          {position !== undefined && (
            <Marker position={position} icon={svgIcon} />
          )}
          {stops.map((stop) => (
            <Marker position={stop} icon={positionIcon} />
          ))}
          {waypoints.map((stop) => (
            <Marker position={stop} icon={waypointIcon} />
          ))}
        </MapContainer>
      </div>
    </>
  );
};
export default GMap;
