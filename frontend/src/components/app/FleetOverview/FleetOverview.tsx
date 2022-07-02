import { useAppSelector } from '../../../store/hooks';
import SingleDevice from './SingleDevice';

const FleetOverview = () => {
  const devices = useAppSelector((store) => store.devices.devices);
  return (
    <>
      <main className='flex-1'>
        <div className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Flottenübersicht
            </h1>
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
            <div className='mt-8 mb-8 grid xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
              {devices.map(function (item: any, _i: any) {
                return <SingleDevice {...item} key={_i} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FleetOverview;
