import { useParams } from 'react-router-dom';
import Incidents from './Incidents';

const Delivery = () => {
  let params = useParams();
  return (
    <>
      <main className='flex-1'>
        <div className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Sendung: {params.deliveryId}
            </h1>
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8'>
            <Incidents />
          </div>
        </div>
      </main>
    </>
  );
};

export default Delivery;
