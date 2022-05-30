/* This example requires Tailwind CSS v2.0+ */
import { HiArrowSmDown, HiArrowNarrowUp } from 'react-icons/hi';
import { FaTemperatureHigh, FaSlash } from 'react-icons/fa';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { MdOutlineVibration } from 'react-icons/md';
import { classNames } from '../../../../utils/classNames';

const stats = [
  {
    id: 1,
    name: 'Temperatur',
    stat: '7',
    icon: FaTemperatureHigh,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Feuchtigkeit',
    stat: '2',
    icon: MdOutlineWaterDrop,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Erschütterung',
    stat: '3',
    icon: MdOutlineVibration,
    change: '3.2%',
    changeType: 'decrease',
  },
  {
    id: 4,
    name: 'Neigung',
    stat: '0',
    icon: FaSlash,
    change: '0',
    changeType: '',
  },
];

const Incidents = () => {
  return (
    <div>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        Seit Versand:
      </h3>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map((item) => (
          <div
            key={item.id}
            className='relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden'
          >
            <dt>
              <div className='absolute bg-indigo-500 rounded-md p-3'>
                <item.icon className='h-6 w-6 text-white' aria-hidden='true' />
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
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>
                {item.change}
              </p>
              <div className='absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6'>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    {' '}
                    Alle Incidents einsehen
                    <span className='sr-only'> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
export default Incidents;
