import Image from 'next/image';
import { useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import { DesignServices, DeleteForever, Visibility } from '@mui/icons-material';
import { dateFormat } from '@/utils/common';
import { useRouter } from 'next/router';

interface TemplateItemProp {
  data: Record<string, any>,
  onEvent: Function
}
function ButtonGroup({ data, onEvent }:{ data: Record<string, any>, onEvent: Function}) {
  const router = useRouter();

  function toDesign() {
    router.push(`/design/${data.uuid}`);
  }

  return (
    <div className='flex w-full flex-row justify-around items-center '>
      <Tooltip title={`预览模板`}>
        <Visibility sx={{ color: '#ecce84' }} onClick={() => { onEvent?.('preview', data); }} />
      </Tooltip>
      <Tooltip title={`基于模板创建新页面`}>
        <DesignServices sx={{ color: '#ecce84' }} onClick={() => { onEvent?.('create', data); }} />
      </Tooltip>
      <Tooltip title={`删除模板`}>
        <DeleteForever sx={{ color: '#f57777' }} onClick={() => { onEvent?.('delete', data); }}/>
      </Tooltip>
    </div>
  );
}
export default function TemplateItem({ data, onEvent }: TemplateItemProp) {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className='shrink-0 w-full'>
      <div className='relative flex flex-col w-full h-36 bg-zinc-400 bg-opacity-10 rounded-lg border border-solid dark:border-zinc-500 border-zinc-300 overflow-hidden'>
        <b className='flex flex-row items-center text-xs overflow-ellipsis whitespace-nowrap p-1 absolute top-0 left-0 right-0 dark:text-zinc-100 text-zinc-800 h-6 z-10 dark:bg-zinc-700 bg-zinc-300 bg-opacity-70 pl-2'>
          <i className='border-0 border-l-2 border-dashed border-yellow-500 block bg-amber-500 mr-2 w-1 h-3'></i>
          模板：{data.name}
        </b>
        <div className='relative flex-1 mt-6 opacity-80'>
          <Image
            alt='页面'
            src={data.cover ?? '/illustrations/templatePage.png'}
            fill
            sizes='100%'
          />
          <div className='bg-zinc-600 dark:bg-zinc-800 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-90 dark:hover:bg-opacity-90 flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-10 transition-all duration-300 ' onMouseLeave={() => { setShowButton(false); }} onMouseEnter={() => { setShowButton(true); }}>
            {
              showButton && <ButtonGroup onEvent={onEvent} data={data} />
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