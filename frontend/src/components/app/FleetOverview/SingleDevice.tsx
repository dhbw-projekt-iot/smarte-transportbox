import { useState } from 'react';
import { FaRaspberryPi } from 'react-icons/fa';
import { HiCog } from 'react-icons/hi';
import { useAppDispatch } from '../../../store/hooks';
import { classNames } from '../../../utils/classNames';

const SingleDevice = (device: any) => {
  const [flip, setFlip] = useState(false);

  let dispatch = useAppDispatch();

  const openCardSettings = () => {
    setFlip(true);
  };

  const closeCardSettings = () => {
    setFlip(false);
  };

  return (
    <>
      <div className='group perspective'>
        <div
          className={classNames(
            'relative bg-white rounded-lg shadow-lg preserve-3d w-full h-fit duration-700',
            flip ? ' my-rotate-y-180' : '',
          )}
        >
          <div className='absolute backface-hidden my-rotate-y-180 rounded-lg w-full h-fit overflow-hidden'>
            <div className='flex justify-between bg-indigo-600 px-4 py-3 w-full'>
              <h3 className='text-lg leading-6 font-medium text-white'>
                {device.displayName}
              </h3>

              {/*!device.active && (
                <span className='inline-flex rounded-full bg-gray-100 px-3 text-xs font-semibold leading-5 text-gray-600'>
                  Inaktiv
                </span>
              )*/}

              <button onClick={closeCardSettings}>
                <HiCog className='w-6 h-6 text-white hover:text-gray-200' />
              </button>
            </div>
            <div className='grid grid-cols-2 justify-center content-center gap-3 pt-6 pb-2 px-4 border-t border-gray-200'>
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={closeCardSettings}
              >
                Zurück
              </button>
            </div>
          </div>
          <div className='relative backface-hidden rounded-lg w-full h-fit overflow-hidden'>
            <div className='flex justify-between bg-indigo-600 px-4 py-3 w-full'>
              <h3 className='text-lg leading-6 font-medium text-white'>
                {device.displayName}
              </h3>
              {/*!device.active && (
                <span className='inline-flex rounded-full bg-gray-100 px-3 text-xs font-semibold leading-5 text-gray-600'>
                  Inaktiv
                </span>
              )*/}
              <button onClick={openCardSettings}>
                <HiCog className='w-6 h-6 text-white hover:text-gray-200' />
              </button>
            </div>
            <div className='flex justify-center border-t border-gray-200 px-4 py-3'>
              <FaRaspberryPi className='text-indigo-600 h-12 w-12' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleDevice;
