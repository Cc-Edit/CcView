import { PageData, ApplicationData } from '@/types';
import AppContainer from '@/components/Application/AppContainer';
import { useEffect, useState } from 'react';
import { getFolder } from '@api/application';
type AppDataType = (PageData | ApplicationData)[]
export default function ApplicationPage() {
  const [appList, setAppList] = useState<ApplicationData[]>([]);
  const [pageList, setPageList] = useState<PageData[]>([]);
  function formatData(data: AppDataType) {
    const pageData: PageData[] = [];
    const appData: ApplicationData[] = [];
    data.forEach(item => {
      if (item.type === 0) {
        pageData.push(item as PageData);
      } else {
        appData.push(item as ApplicationData);
      }
    });
    setAppList(appData);
    setPageList(pageData);
  }
  function reloadData() {
    getFolder('').then(({ data }) => {
      formatData(data as AppDataType);
    });
  }

  useEffect(() => {
    getFolder('').then(({ data }) => {
      formatData(data as AppDataType);
    });
  }, []);
  return (
    <div className='overflow-hidden relative mr-2 mt-10'>
      <div className='mb-5'>
        <AppContainer title='应用' type='app' emptyText='还没创建应用~' onChange={reloadData} data={appList}/>
      </div>
      <div className='mb-5'>
        <AppContainer title='页面' type='page' emptyText='当前路径下还没有创建页面~' onChange={reloadData} data={pageList}/>
      </div>
    </div>
  );
}
