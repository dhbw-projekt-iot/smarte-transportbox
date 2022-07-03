import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [0, 0], // size of the icon
  iconAnchor: [12, 42], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -51], // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const RoutingMachine = ({ waypoints }) => {
  const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
      show: false,
      waypoints: waypoints as any,
      waypointMode: 'snap',
      collapsible: true,
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: false,
      showAlternatives: true,
    });

    return instance;
  };
  const Route = createControlComponent(createRoutineMachineLayer);

  return Route;
};

export default RoutingMachine;
