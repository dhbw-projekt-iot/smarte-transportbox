import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { useMemo, useState } from 'react';
import TableFilter from '../TableFilter';
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
import { useAppSelector } from '../../../../store/hooks';
import dayjs from 'dayjs';
import TableNav from '../TableNav';

const IncidentsTable = ({ transportationTask, setIncidentTableOpen }) => {
  const incidents = transportationTask.incidents;
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
        width: 'w-1/4 ',
      },
      {
        Header: 'Typ',
        accessor: 'sensor',
        width: 'w-1/4 ',
      },
      {
        Header: 'Wert',
        accessor: 'value',
        width: 'w-1/4 ',
      },
      {
        Header: 'Zeitpunkt',
        accessor: 'createdAt',
        width: 'w-1/4 ',
        Cell: (cell: any) => {
          return dayjs(cell.row.values.createdAt).format('DD.MM.YYYY HH:mm');
        },
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
    { columns, data: incidents },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  // return Element
  return (
    <>
      <div className='w-full sm:flex'>
        <div className='w-full flex justify-between gap-4 pb-4'>
          <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
              <TableNav
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                gotoPage={gotoPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                previousPage={previousPage}
                nextPage={nextPage}
                pageCount={pageCount}
              />
            </div>
            <div className='w-full flex justify-center'>
              <button
                className='font-medium text-md text-indigo-600 hover:text-indigo-500 my-3'
                onClick={() => setIncidentTableOpen(false)}
              >
                Tabelle ausblenden
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentsTable;
