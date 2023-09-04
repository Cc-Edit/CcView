import { QueryConfig, QueryItem } from '@/types';
import { get } from 'lodash';
import loadable from '@loadable/component';

interface TableQueryProp {
  query: Record<string, any>
  config: QueryConfig
  eventMap?: Record<string, Function>
  setQuery: (query: any) => void
}
const ItemComponent = loadable((props: {is: string}) => import(`./item/${props.is}.tsx`), {
  fallback: <div>Loading...</div>,
  cacheKey: props => props.is
});
// 生成每一行
function genQueryRow(eventMap: Record<string, Function>, rowList : QueryItem[], query: Record<string, any>, setQuery: (newQuery: any) => void, key: string) {
  const rowElement = rowList.map((queryItem, index) => {
    const { type, className = '', mapping = {}, properties } = queryItem;
    const { key } = mapping;
    const value = get(query, key, undefined);
    const handlerChange = (newValue: any) => {
      if (key) {
        const newQuery = {
          ...query,
          [key]: newValue,
          page: 0
        };
        setQuery?.(newQuery);
      }
    };
    return (
      <div key={`${type}-${index}`} className={`${className} shrink-0 mb-4`}>
        <ItemComponent is={queryItem.type} {...{ ...properties, value, onChange: handlerChange, eventMap }} ></ItemComponent>
      </div>
    );
  });
  return (
    <div key={key} className={`w-full shrink-0 flex flex-row flex-wrap justify-start items-center`}>
      {
        rowElement
      }
    </div>
  );
}

export default function TableQuery(props: TableQueryProp) {
  const { query = {}, config, setQuery, eventMap = {}} = props;
  const fromChild = config.layout.map((rowConfig, index) => {
    return genQueryRow(eventMap, rowConfig, query, setQuery, `query-row-${index}`);
  });
  return (
    <div className='m-h-24 px-4 flex flex-row flex-wrap'>
      {
        fromChild
      }
    </div>
  );
}