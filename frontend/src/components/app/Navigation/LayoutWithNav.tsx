import Navigation from './Navigation';
import PrivateOutlet from './PrivateOutlet';

const LayoutWithNavbar = () => {
  return (
    <>
      <div className='w-full h-full min-h-screen bg-gray-50'>
        <Navigation />
        <div className='md:ml-64 mx-4 py-4 md:py-6 transition-all ease-in-out duration-500 transform'>
          <PrivateOutlet />
        </div>
      </div>
    </>
  );
};

export default LayoutWithNavbar;
