import { Link } from 'react-router-dom';
import { logoff } from '../../store/logSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const Logged = () => {
  const logged = useAppSelector((state) => state.log.logged);
  const dispatch = useAppDispatch();
  if (logged) {
    return (
      <button
        className='block px-3 py-2 rounded-md text-base font-medium bg-blue-700 text-white hover:bg-white hover:text-blue-700'
        onClick={() => dispatch(logoff())}
      >
        Abmelden
      </button>
    );
  } else {
    return (
      <div className='flex space-x-4'>
        <Link
          className='block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-700 hover:bg-gray-200'
          to={'/app'}
        >
          Anmelden
        </Link>
        <Link
          className='block px-3 py-2 rounded-md text-base font-medium bg-blue-700 text-white hover:bg-blue-800'
          to={'/Register'}
        >
          Registrieren
        </Link>
      </div>
    );
  }
};

export default Logged;
