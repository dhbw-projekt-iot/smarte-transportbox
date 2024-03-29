import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/app/Dashboard/Dashboard';
import Deliveries from './components/app/Deliveries/Deliveries';
import Delivery from './components/app/Deliveries/Delivery/Delivery';
import FleetOverview from './components/app/FleetOverview/FleetOverview';
import LayoutWithNavbar from './components/app/Navigation/LayoutWithNav';
import Landing from './components/LandingPage/Landing';
import { fetchDevices } from './store/deviceSlice';
import { store } from './store/store';
import { fetchTransportationTasks } from './store/transportationTaskSlice';

function App() {
  useEffect(() => {
    store.dispatch(fetchDevices());
    store.dispatch(fetchTransportationTasks());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Landing />} />
            <Route path='app' element={<LayoutWithNavbar />}>
              <Route index element={<Deliveries />} />
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
