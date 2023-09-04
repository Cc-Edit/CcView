import { Table, TableCell, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import QueryFactory from '@/components/Query/QueryFactory';
import { QueryConfig } from '@/types';
import loadable from '@loadable/component';
import CircularProgress from '@mui/material/CircularProgress';
import EmptyContainer from '@/components/Design/components/EmptyContainer';
const TableTemp = loadable((props: Record<string, any>) => import(`./temp/${props.is}`), {
  fallback: <div>Loading...</div>,
  cacheKey: props => props.is
});

interface Query {
  pageSize?: number
  page?: number
}
interface TableFactoryProp {
  queryConfig: QueryConfig
  rowData: Record<string, any>[]
  query: Query
  count: number
  loading: boolean
  setQuery: (query: any) => void
  eventMap?: Record<string, Function>
}
export default function MuiTable(props: TableFactoryProp) {
  const { eventMap = {}, queryConfig, rowData, count, query = {}, setQuery, loading } = props;
  const { tableConfig: { columns }} = queryConfig;

  const handleChangePage = (event: unknown, newPage: number) => {
    setQuery({ ...query, page: newPage });
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, pageSize: Number(event.target.value), page: 0 });
  };
  const HeadChild = columns.map((column, index) => (
    <TableCell key={index} align={column.align || 'left'} style={{ minWidth: column.minWidth }}>
      {column.label}
    </TableCell>
  ));
  const BodyChild = rowData.map((row, index) => {
    return (
      <TableRow hover key={index}>
        {columns.map(column => {
          const { key, component, format, align = 'left', getClass = '' } = column;
          const value = row[key];
          let child = format ? format(value) : value;
          let className = getClass ? getClass(value) : '';
          if (component) {
            child = <TableTemp key='key' is={component} {...{ ...row, eventMap }}/>;
          }
          return (
            <TableCell key={key} align={align} className={className}>
              {child}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
  return (
    <div className={`transition-all duration-700 absolute left-0 right-0 top-0 bottom-0`}>
      <div className='border border-solid border-neutral-300 dark:border-neutral-700 mt-18 mx-2 py-1  rounded-xl'>
        <QueryFactory
          query={query}
          config={queryConfig}
          eventMap={eventMap}
          setQuery={setQuery} />
        <div className='mt-2'>
          <TableContainer className='relative' >
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  { HeadChild }
                </TableRow>
              </TableHead>
              <TableBody className={`${BodyChild.length === 0 ? 'h-56' : ''} relative`} >
                { BodyChild }
              </TableBody>
            </Table>
            { loading && <div className='z-10 absolute left-0 right-0 top-12 bottom-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 opacity-90'><CircularProgress /></div>}
            { BodyChild.length === 0 && <div className='z-0 absolute left-0 right-0 top-14 bottom-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 py-2'><EmptyContainer text='空列表'></EmptyContainer> </div>}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20, 25, 50]}
            showFirstButton
            showLastButton
            component='div'
            count={count}
            rowsPerPage={query.pageSize ?? 10}
            page={query.page ?? 0}
            getItemAriaLabel={type => `前往 ${type} 页`}
            labelDisplayedRows={({ from, to, count }) => `第${from}条至第${to}条 共${count !== -1 ? count : to}条`}
            labelRowsPerPage='每页条数'
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}