import { useRouter } from 'next/router';
import { PageData } from '@/types';
import { getDetail, getFolder } from '@api/application';
import AppContainer from '@/components/Application/AppContainer';
import { useEffect, useState } from 'react';
import { Breadcrumbs, Link } from '@mui/material';

export default function ApplicationList() {
  const router = useRouter();
  const { appId } = router.query;
  const [pageList, setPageList] = useState<PageData[]>([]);
  const [appTitle, setAppTitle] = useState('');

  function reloadData() {
    getFolder(appId as string).then(({ data }) => {
      setPageList(data as PageData[]);
    });
  }

  useEffect(() => {
    if (appId) {
      getFolder(appId as string).then(({ data }) => {
        setPageList(data as PageData[]);
      });
      getDetail(appId as string).then(({ data }) => {
        setAppTitle(data.title);
      });
    }
  }, [appId]);

  return (
    <div className='overflow-hidden relative mr-2 mt-6'>
      <div className='h-10 relative '>
        <Breadcrumbs className='text-sm'>
          <Link underline='hover' color='inherit' href='/application'>
            应用列表
          </Link>
          <span>{appTitle}</span>
        </Breadcrumbs>
      </div>
      <div className='mb-5'>
        <AppContainer title='页面' type='page' emptyText='当前路径下还没有创建页面~' onChange={reloadData} parent={appId as string} data={pageList}/>
      </div>
    </div>
  );
}