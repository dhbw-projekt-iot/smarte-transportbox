/* This example requires Tailwind CSS v2.0+ */
import { HiArrowSmDown, HiArrowNarrowUp } from 'react-icons/hi';
import { FaTemperatureHigh, FaSlash } from 'react-icons/fa';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { MdOutlineVibration } from 'react-icons/md';
import { classNames } from '../../../../utils/classNames';

const Incidents = ({ transportationTask, setIncidentTableOpen }) => {
  let incidents = {
    Temperature: [] as any,
    Humidity: [] as any,
    Vibration: [] as any,
    Tilt: [] as any,
  };
  if (transportationTask.incidents) {
    transportationTask.incidents.map((dataPoint) => {
      incidents[dataPoint.sensor].push(dataPoint);
    });
  }

  const stats = [
    {
      id: 1,
      name: 'Temperatur',
      stat: incidents.Temperature.length,
      icon: FaTemperatureHigh,
      change: incidents.Temperature.length / 1,
      changeType: incidents.Temperature.length > 0 ? 'increase' : 'decrease',
      render: transportationTask.constraints.temperature ? true : false,
    },
    {
      id: 2,
      name: 'Feuchtigkeit',
      stat: incidents.Humidity.length,
      icon: MdOutlineWaterDrop,
      change: incidents.Humidity.length / 1,
      changeType: incidents.Humidity.length > 0 ? 'increase' : 'decrease',
      render: transportationTask.constraints.humidity ? true : false,
    },
    {
      id: 3,
      name: 'Erschütterung',
      stat: incidents.Vibration.length,
      icon: MdOutlineVibration,
      change: incidents.Vibration.length / 1,
      changeType: incidents.Vibration.length > 0 ? 'increase' : 'decrease',
      render: transportationTask.constraints.vibration ? true : false,
    },
    {
      id: 4,
      name: 'Neigung',
      stat: incidents.Tilt.length,
      icon: FaSlash,
      change: incidents.Tilt.length / 1,
      changeType: incidents.Tilt.length > 0 ? 'increase' : 'decrease',
      render: transportationTask.constraints.tilt ? true : false,
    },
  ];

  return (
    <div>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        Seit Versand:
      </h3>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map(
          (item) =>
            item.render && (
              <div
                key={item.id}
                className='relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden'
              >
                <dt>
                  <div className='absolute bg-indigo-500 rounded-md p-3'>
                    <item.icon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  <p className='ml-16 text-sm font-medium text-gray-500 truncate'>
                    {item.name}
                  </p>
                </dt>
                <dd className='ml-16 pb-6 flex items-baseline sm:pb-7'>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {item.stat}
                  </p>
                  <p
                    className={classNames(
                      item.changeType === 'increase'
                        ? 'text-red-600'
                        : 'text-green-600',
                      'ml-2 flex items-baseline text-sm font-semibold',
                    )}
                  >
                    {item.changeType === 'increase' ? (
                      <HiArrowNarrowUp
                        className='self-center flex-shrink-0 h-5 w-5 text-red-500'
                        aria-hidden='true'
                      />
                    ) : (
                      <HiArrowSmDown
                        className='self-center flex-shrink-0 h-5 w-5 text-green-500'
                        aria-hidden='true'
                      />
                    )}

                    <span className='sr-only'>
                      {item.changeType === 'increase'
                        ? 'Increased'
                        : 'Decreased'}{' '}
                      by
                    </span>
                    {item.change}
                  </p>
                  <div className='absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6'>
                    <div className='text-sm'>
                      <button
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => setIncidentTableOpen(true)}
                      >
                        Alle Incidents einsehen
                        <span className='sr-only'> {item.name} stats</span>
                      </button>
                    </div>
                  </div>
                </dd>
              </div>
            ),
        )}
      </dl>
    </div>
  );
};
export default Incidents;
