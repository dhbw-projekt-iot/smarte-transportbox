import { FaTemperatureHigh, FaSlash } from 'react-icons/fa';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { MdOutlineVibration } from 'react-icons/md';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import VibrationChart from './VibrationChart';
import TiltChart from './TiltChart';
import { testData } from '../testData';

const Charts = ({ transportationTask }) => {
  const stats = [
    {
      id: 1,
      name: 'Temperatur (letzte 24 Stunden)',
      icon: FaTemperatureHigh,
      chart: <TemperatureChart transportationTask={transportationTask} />,
      render: transportationTask.constraints.temperature ? true : false,
    },

    {
      id: 2,
      name: 'Feuchtigkeit (letzte 24 Stunden)',
      icon: MdOutlineWaterDrop,
      chart: <HumidityChart transportationTask={transportationTask} />,
      render: transportationTask.constraints.humidity ? true : false,
    },
    {
      id: 3,
      name: 'Erschütterung (letzte 24 Stunden)',
      icon: MdOutlineVibration,
      chart: <VibrationChart transportationTask={transportationTask} />,
      render: transportationTask.constraints.vibration ? true : false,
    },
    {
      id: 4,
      name: 'Neigung (letzte 24 Stunden)',
      icon: FaSlash,
      chart: <TiltChart transportationTask={transportationTask} />,
      render: transportationTask.constraints.tilt ? true : false,
    },
  ];

  return (
    <>
      <h3 className='pt-4 text-lg leading-6 font-medium text-gray-900'>
        Verlaufsübersicht:
      </h3>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-2'>
        {stats.map(
          (item) =>
            item.render && (
              <div
                key={item.id}
                className='relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden'
              >
                <div className='flex justify-center'>
                  <div className='bg-indigo-500 rounded-md p-3'>
                    <item.icon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  <h3 className='ml-8 text-md font-medium text-gray-500 truncate self-center'>
                    {item.name}
                  </h3>
                </div>
                <dd className='pb-6 flex items-baseline align-center sm:pb-7'>
                  {item.chart}
                  <div className='absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6'>
                    <div className='text-sm'>
                      <a
                        href='#'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        {' '}
                        Weitere Daten einsehen
                        <span className='sr-only'> {item.name} stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            ),
        )}
      </dl>
    </>
  );
};
export default Charts;
