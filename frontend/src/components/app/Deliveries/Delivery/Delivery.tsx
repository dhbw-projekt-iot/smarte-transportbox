import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { testData } from '../testData';
import Charts from './Charts';
import Incidents from './Incidents';
import GMap from './Map';

const Delivery = () => {
  let params = useParams();

  const transportationTasks = useAppSelector(
    (store) => store.transportationTasks.transportationTasks,
  );
  const [transportationTask, setTransportationTask] = useState(
    undefined as any,
  );
  useEffect(() => {
    let index = transportationTasks.findIndex(
      (task) => task._id === params.deliveryId,
    );
    if (index !== -1) {
      setTransportationTask(transportationTasks[index]);
    }
  }, [transportationTasks]);

  return (
    <>
      <main className='flex-1'>
        <div className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Sendung: {params.deliveryId}
              <span className='ml-6 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-gray-800'>
                {transportationTask ? transportationTask!.status : ''}
              </span>
            </h1>
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8'>
            {transportationTask && (
              <>
                <Incidents transportationTask={transportationTask} />
                <Charts transportationTask={transportationTask} />
                <GMap />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Delivery;
