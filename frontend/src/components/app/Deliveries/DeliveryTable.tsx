import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { useMemo, useState } from 'react';
import DeliveryFilter from './DeliveryFilter';
import {
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiPlus,
  HiMinusSm,
  HiOutlineArrowSmDown,
  HiOutlineArrowSmUp,
} from 'react-icons/hi';
import { useNavigate } from 'react-router';
import NewDelivery from './NewDelivery';
import { useAppSelector } from '../../../store/hooks';
import dayjs from 'dayjs';

const DeliveryTable = () => {
  const deliveries = useAppSelector(
    (state) => state.transportationTasks.transportationTasks,
  );
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const showDetails = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    navigate('/app/delivery/' + id);
  };

  const columns: any = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
        width: 'w-1/12 ',
      },
      {
        Header: 'Sendungsart',
        accessor: 'productType',
        width: 'w-1/6 ',
      },
      {
        Header: 'Erstelldatum',
        accessor: 'createdAt',
        width: 'w-1/6 ',
        Cell: (cell: any) => {
          return dayjs(cell.row.values.createdAt).format('DD.MM.YYYY');
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 'w-1/6 ',
        Cell: (cell: any) => {
          switch (cell.row.values.status) {
            case 'zugestellt': {
              return (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  {cell.row.values.status}
                </span>
              );
            }
            case 'ausstehend': {
              return (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  {cell.row.values.status}
                </span>
              );
            }
            case 'versendet': {
              return (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  {cell.row.values.status}
                </span>
              );
            }
            case 'verloren': {
              return (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                  {cell.row.values.status}
                </span>
              );
            }
            default: {
              return (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                  {cell.row.values.status}
                </span>
              );
            }
          }
        },
      },
      {
        Header: '',
        accessor: 'edit',
        width: 'w-1/12 ',
        Cell: (cell: any) => (
          <button
            className='text-indigo-700 hover:text-indigo-700'
            value='edit'
            onClick={(e) => showDetails(e, cell.row.values._id)}
          >
            Details
          </button>
        ),
      },
    ],
    [],
  );

  //Hooks von der React-Table Bibliothek
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data: deliveries },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  // return Element
  return (
    <>
      <NewDelivery open={open} setOpen={setOpen} />
      <div className='w-full sm:flex'>
        <div className='w-full flex justify-between gap-4 pb-4'>
          <DeliveryFilter filter={globalFilter} setFilter={setGlobalFilter} />

          <button
            type='button'
            className='focus:outline-none rounded-full border border-transparent bg-indigo-700 hover:bg-indigo-900 p-2 text-white shadow-sm focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
            onClick={() => setOpen(true)}
          >
            <HiPlus className='w-7 h-7' />
          </button>
        </div>
      </div>
      <div className='h-max min-w-full shadow-loginbody rounded-md'>
        <div className='overflow-x-auto text-gray-700'>
          <div className=' min-w-full'>
            <div className='min-w-full overflow-x-auto rounded-md bg-white'>
              <table
                {...getTableProps()}
                className='w-full divide-y divide-gray-200 border-t-4 border-indigo-700 border-b-2'
              >
                <thead className='bg-gray-50'>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                          scope='col'
                          className={
                            column.width +
                            'py-2 text-center text-xs text-gray-700 uppercase tracking-wider lg:text-left lg:px-4'
                          }
                        >
                          <div className='flex '>
                            {column.render('Header')}
                            {column.getHeaderProps(
                              column.getSortByToggleProps(),
                            ).key != 'header_edit' ? (
                              <span className='inline-block align-bottom'>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <HiOutlineArrowSmDown className='h-5 w-5 text-red-600' />
                                  ) : (
                                    <HiOutlineArrowSmUp className='h-5 w-5 text-green-600' />
                                  )
                                ) : (
                                  <HiMinusSm className='h-5 w-5 text-gray-600' />
                                )}
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className='bg-white divide-y divide-gray-200'
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr className='hover:bg-gray-100' {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className='px-6 py-4 whitespace-nowrap'
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='px-4 py-3 flex justify-between flex-wrap items-center'>
                <div className='m-1'>
                  <p className='text-sm font-bold inline'>
                    Page {pageIndex + 1} of {pageOptions.length}
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
                        Show {pageSize}
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
                      <span className='sr-only'>Previous</span>
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
                      <span className='sr-only'>Previous</span>
                      <HiOutlineChevronLeft
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </a>
                    <a
                      href='#'
                      className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                      onClick={() => nextPage()}
                    >
                      <span className='sr-only'>Next</span>
                      <HiOutlineChevronRight
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </a>
                    <a
                      href='#'
                      className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                      onClick={() => gotoPage(pageCount - 1)}
                    >
                      <span className='sr-only'>Next</span>
                      <HiOutlineChevronDoubleRight
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryTable;
