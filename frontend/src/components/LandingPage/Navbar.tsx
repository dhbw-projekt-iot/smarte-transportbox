import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import Logged from './Logged';
import { Link } from 'react-router-dom';

export interface Props {
  sites: { name: string; link: string }[];
}
const Navbar = (props: Props) => {
  return (
    <Disclosure as='nav' className='bg-purple-500'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <HiX className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <HiMenu className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-strech sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <Link to={'/'}>
                    <img
                      className='block h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                      alt='Workflow'
                    />
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {props.sites.map((site) => (
                      <a
                        href={site.link}
                        className='bg-purple-500 text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      >
                        {site.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden sm:block inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <Logged />
              </div>
            </div>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {props.sites.map((site: { name: string; link: string }) => (
                <a
                  href={site.link}
                  className='bg-purple-500 text-white hover:bg-purple-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  {site.name}
                </a>
              ))}
              <Logged />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
