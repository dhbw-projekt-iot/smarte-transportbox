import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/app/Dashboard/Dashboard';
import Deliveries from './components/app/Deliveries/Deliveries';
import Delivery from './components/app/Deliveries/Delivery/Delivery';
import FleetOverview from './components/app/FleetOverview/FleetOverview';
import LayoutWithNavbar from './components/app/Navigation/LayoutWithNav';
import Landing from './components/LandingPage/Landing';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Landing />} />
            <Route path='app' element={<LayoutWithNavbar />}>
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='deliveries' element={<Deliveries />} />

              <Route path='delivery/:deliveryId' element={<Delivery />} />

              <Route path='fleet-overview' element={<FleetOverview />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
