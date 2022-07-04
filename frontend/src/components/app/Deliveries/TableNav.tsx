import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

const TableNav = ({
  pageIndex,
  pageOptions,
  gotoPage,
  pageSize,
  setPageSize,
  previousPage,
  nextPage,
  pageCount,
}) => {
  return (
    <>
      {' '}
      <div className='px-4 py-3 flex justify-between flex-wrap items-center'>
        <div className='m-1'>
          <p className='text-sm font-bold inline'>
            Seite {pageIndex + 1} von {pageOptions.length}
          </p>
        </div>
        <div className='m-1'>
          <select
            className='rounded-md border border-gray-500 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-transparent focus:ring-indigo-700'
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Zeige {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className='m-1'>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <a
              href='#'
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => gotoPage(0)}
            >
              <span className='sr-only'>Zurück</span>
              <HiOutlineChevronDoubleLeft
                className='h-5 w-5'
                aria-hidden='true'
              />
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => previousPage()}
            >
              <span className='sr-only'>Zurück</span>
              <HiOutlineChevronLeft className='h-5 w-5' aria-hidden='true' />
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => nextPage()}
            >
              <span className='sr-only'>Weiter</span>
              <HiOutlineChevronRight className='h-5 w-5' aria-hidden='true' />
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => gotoPage(pageCount - 1)}
            >
              <span className='sr-only'>Weiter</span>
              <HiOutlineChevronDoubleRight
                className='h-5 w-5'
                aria-hidden='true'
              />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TableNav;
