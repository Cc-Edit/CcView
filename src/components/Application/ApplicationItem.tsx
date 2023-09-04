import FolderIcon from '@/components/Svg/FolderIcon';
import { ApplicationData, MoreMenuEvent } from '@/types';
import { Avatar, Tooltip } from '@mui/material';
import MoreIcon from '@/components/MoreIcon';
import { useRouter } from 'next/router';
import { dateFormat } from '@/utils/common';

interface ApplicationItemProp {
  data: ApplicationData
  onEvent: (params: MoreMenuEvent) => void
}

export default function ApplicationItem({ data, onEvent }: ApplicationItemProp) {
  const router = useRouter();
  function jumpToAppList() {
    router.push(`/application/${data.uuid}`);
  }
  return (
    <div className='shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-2 '>
      <div className='w-full bg-zinc-400 bg-opacity-10 rounded-lg p-2 border border-solid dark:border-zinc-700 border-zinc-300'>
        <div className='flex flex-row'>
          <div className='flex-1 flex flex-row items-center cursor-pointer' onClick={jumpToAppList}>
            <FolderIcon size={50} className='align-middle dark:text-amber-400 text-amber-400' />
            <div className='flex-1 flex flex-col justify-stretch overflow-hidden pl-2'>
              <b className='text-base dark:text-zinc-300 text-zinc-00 mb-1 overflow-ellipsis'>{data.title}</b>
              <span className='text-xs dark:text-zinc-500 text-zinc-400 overflow-ellipsis'> {dateFormat(data.createDate, 'Y-M-D h:m')}</span>
            </div>
          </div>
          <div className='overflow-hidden w-6 relative'>
            <MoreIcon className='absolute -top-2 right-0 cursor-pointer' type={data.type} title={data.title} uuid={data.uuid} onEvent={onEvent} />
            <Tooltip title={`创建者：${data.createUser?.name}`}>
              <Avatar className='border border-solid border-amber-600 w-6 h-6 absolute bottom-0 right-0' src={data.createUser?.avatar} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}