import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
interface PriceItemProp{
  className: string
  data: Record<string, any>
}
function Icon({ className = '', path = '' }) {
  return (
    <div className={`h-12 w-12 ${className}`}>
      <Image
        alt=''
        src={path}
        fill
        sizes='100vw'
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
export default function PriceItem({ className = '', data = {}}: PriceItemProp) {
  const { title = '', desc = '', price = {}, moduleList = [], isRecommend = false, isFree = false, isVIp = false, isUp = false } = data;
  const [open, setOpen] = useState(false);
  function goGithub() {
    window.open('https://github.com/Cc-Edit', '_blank');
  }
  const hideModel = () => {
    setOpen(false);
  };
  function showModel() {
    setOpen(true);
  }
  const moduleChild = moduleList.map((item: string, index: number) => {
    return (
      <li key={index} className='flex items-center'>
        <div className='flex flex-row justify-start items-center rounded-full p-2 text-violet-500'>
          <Icon className='relative w-5 h-5 mr-4 shrink-0' path='/icon/pick.png'/>
          <span className='text-base text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-500'>
            {
              item
            }
          </span>
        </div>
      </li>
    );
  });
  return (
    <div className={`${className} w-1/3 relative z-0 rounded-lg bg-zinc-200 dark:bg-zinc-300 border border-dashed border-neutral-500 hover:-translate-y-2 transition-all duration-300`}>
      {
        isRecommend && <Icon className='absolute top-1 right-1' path='/icon/seal.png' />
      }
      {
        isFree && <Icon className='absolute rotate-12 top-1 right-1' path='/icon/recommend.png' />
      }
      {
        isVIp && <Icon className='absolute top-1 right-1' path='/icon/vipt.png' />
      }
      {
        isUp && <Icon className='absolute top-1 right-1' path='/icon/up.png' />
      }
      <div className='text-black rounded-lg overflow-hidden'>
        <div className='block text-center text-sm mt-2 text-neutral-500 px-8'>
          <h1 className='text-lg p-3 pb-0 text-center text-neutral-800'>
            {title}
          </h1>
          { desc }
        </div>
        <div className='flex flex-wrap px-3 w-full justify-start py-2'>
          <ul className='p-0 m-0'>
            {
              moduleChild
            }
          </ul>
        </div>
        <div className='w-full relative flex flex-row justify-center items-center py-2 mt-2'>
          <div className='text-sm text-neutral-500 mr-5 text-left line-through'>原价：￥{price.old}</div>
          <div className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600 flex justify-center items-center leading-9'>{
            price.now === -1 ? '暂无报价' : (<span>促销价:￥<b className='text-3xl'>{price.now}</b></span>)
          }</div>
        </div>
        <div className='flex items-center px-8 pb-8'>
          {
            isFree && <div
              className='border border-solid border-neutral-900 h-14 flex-1 flex justify-center items-center rounded-md bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 p-1 cursor-pointer'
              onClick={goGithub}
            >
              <Icon className='relative w-6 h-6 mr-4' path='/icon/github.png'></Icon>
              <span className='text-center bg-opacity-0 bg-amber-50 border-0 text-lg text-neutral-50'>Github</span>
            </div>
          }
          {
            isRecommend && <div
              className='border border-solid border-neutral-900 h-14 flex-1 flex justify-center items-center rounded-md bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 p-1 cursor-pointer'
              onClick={showModel}
            >
              <Icon className='relative w-6 h-6 mr-4' path='/icon/store.png'></Icon>
              <span className='text-center bg-opacity-0 bg-amber-50 border-0 text-lg text-neutral-50'>购买源码</span>
            </div>
          }
          {
            isVIp && <div
              className='border border-solid border-neutral-900 h-14 flex-1 flex justify-center items-center rounded-md bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 p-1 cursor-pointer'
              onClick={showModel}
            >
              <Icon className='relative w-6 h-6 mr-4' path='/icon/vip.png'></Icon>
              <span className='text-center bg-opacity-0 bg-amber-50 border-0 text-lg text-neutral-50'>加入开发者</span>
            </div>
          }
          {
            isUp && <div
              className='border border-solid border-neutral-900 h-14 flex-1 flex justify-center items-center rounded-md bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 p-1 cursor-pointer'
              onClick={showModel}
            >
              <Icon className='relative w-6 h-6 mr-4' path='/icon/chat.png'></Icon>
              <span className='text-center bg-opacity-0 bg-amber-50 border-0 text-lg text-neutral-50'>联系作者</span>
            </div>
          }
        </div>
      </div>
      <Dialog onClose={hideModel} open={open}>
        <DialogTitle className='text-base text-center'>联系作者进行购买</DialogTitle>
        <DialogContent className='px-10 py-4'>
          <Icon className='relative w-60 h-60' path='/wechat.png' />
        </DialogContent>
      </Dialog>
    </div>
  );
}