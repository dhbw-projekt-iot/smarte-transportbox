import {
  HiHome,
  HiOutlineAdjustments,
  HiOutlinePaperAirplane,
} from 'react-icons/hi';

export const navItems = [
  /*{ name: 'Dashboard', route: '/app/dashboard', icon: HiHome },*/
  {
    name: 'Sendungen',
    route: '/app/deliveries',
    icon: HiOutlinePaperAirplane,
  },
  {
    name: 'Flottenübersicht',
    route: '/app/fleet-overview',
    icon: HiOutlineAdjustments,
  },
];
