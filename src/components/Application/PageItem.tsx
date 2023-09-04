import Image from 'next/image';
import { MoreMenuEvent, PageData } from '@/types';
import { useState } from 'react';
import { Avatar, Tooltip, Button } from '@mui/material';
import { DesignServices } from '@mui/icons-material';
import MoreIcon from '@/components/MoreIcon';
import { dateFormat } from '@/utils/common';
import { useRouter } from 'next/router';

interface PageItemProp {
  data: PageData
  onEvent: (params: MoreMenuEvent) => void
}

export default function PageItem({ data, onEvent }: PageItemProp) {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  function toDesign() {
    router.push(`/design/${data.uuid}`);
  }
  return (
    <div className=' shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-2 '>
      <div className='relative flex flex-col w-full h-44 bg-zinc-400 bg-opacity-10 rounded-lg border border-solid dark:border-zinc-500 border-zinc-300 overflow-hidden'>
        <div className='h-6 z-10 dark:text-zinc-100 text-zinc-800  dark:bg-zinc-700 bg-zinc-300 bg-opacity-70'>
          <Tooltip title={data.title}>
            <b className='overflow-hidden whitespace-nowrap flex flex-row items-center text-xs p-1 absolute top-0 left-0 right-10 pl-2'>
              <i className='border-0 border-l-2 border-dashed border-yellow-500 block bg-amber-500 mr-2 w-1 h-3'></i>
              {data.title}
            </b>
          </Tooltip>
          <MoreIcon className='absolute top-0 right-2' cover={data.cover} type={data.type} title={data.title} uuid={data.uuid} onEvent={onEvent} />
        </div>
        <div className='relative flex-1 opacity-80'>
          <Image
            alt='页面'
            src={data.cover ?? '/illustrations/templatePage.png'}
            fill
            sizes='100%'
            style={{
              userSelect: 'none',
              objectFit: 'cover'
            }}
          />
          <div className='bg-zinc-600 dark:bg-zinc-800 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-90 dark:hover:bg-opacity-90 flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-10 transition-all duration-300 ' onMouseLeave={() => { setShowButton(false); }} onMouseEnter={() => { setShowButton(true); }}>
            {
              showButton && <Button variant='outlined' onClick={toDesign} startIcon={<DesignServices />}>
                编辑页面
              </Button>
            }
          </div>
        </div>
        <div className='pl-2 h-6 dark:bg-zinc-700 bg-zinc-300 relative'>
          <Tooltip title='创建时间'>
            <span className='text-xs dark:text-zinc-300 text-zinc-700 overflow-ellipsis'>
             {dateFormat(data.createDate, 'Y-M-D h:m')}
            </span>
          </Tooltip>
          <Tooltip title={`创建者：${data.createUser?.name}`}>
            <Avatar className='border border-solid border-amber-600 w-5 h-5 absolute top-0.5 bottom-0.5 right-2' src={data.createUser?.avatar} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}