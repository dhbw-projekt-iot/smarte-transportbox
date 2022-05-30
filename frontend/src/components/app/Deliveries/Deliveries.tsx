import DeliveryTable from './DeliveryTable';

const Deliveries = () => {
  return (
    <>
      <main className='flex-1'>
        <div className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-gray-900'>Sendungen</h1>
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8'>
            <div>
              <DeliveryTable />
            </div>

            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Deliveries;
