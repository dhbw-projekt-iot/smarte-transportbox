import { HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const DeliveryFilter = ({ filter, setFilter }: any) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 400);
  return (
    <>
      <div className='w-full h-fit border-2 border-indigo-700-light p-2 font-semibold rounded-lg bg-white shadow-loginbody'>
        <div className='flex items-center'>
          <HiSearch className='h-5 w-5 ml-2 mr-4 text-onePurple-dark shrink-0' />{' '}
          <input
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder='Sendungen durchsuchen'
            className='rounded-md border border-grey-300 bg-gray-100 pr-10 shadow-sm px-2 focus:outline-0 transition-all focus:ring-oneGrey-light font-one mr-2 w-full'
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryFilter;
