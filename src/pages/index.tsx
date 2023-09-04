import Swiper from '@/components/Swiper';
import TipBox from '@/components/TipBox';
import Image from 'next/image';
import RecommendIcon from '@/components/Svg/RecommendIcon';
import { Storefront, CreateNewFolder, DesignServices } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
export default function IndexPage() {
  const router = useRouter();
  const stepImages = [
    '/3d/3d-casual-life-data-analysis.png',
    '/3d/3d-casual-life-design-composition-laptop.png',
    '/3d/3d-casual-life-young-man-drawing-a-curve-in-design-program.png'
  ];
  function goStore() {
    router.push('/store');
  }
  return (
    <>
      <div className='pt-8 flex flex-row'>
        <Swiper lottieClassName='w-80' className='dark:hover:shadow-neutral-700 hover:shadow-neutral-300 sm:w-full md:w-full lg:w-full xl:w-2/3 bg-neutral-100 dark:bg-neutral-800 border border-solid border-zinc-300 dark:border-zinc-600' />
        <TipBox className='w-0 xl:w-1/3 overflow-hidden hover:-translate-y-1 transition-all duration-500' />
      </div>
      <div className='mt-5 w-full bg-neutral-100 dark:bg-neutral-800 border border-solid border-zinc-300 dark:border-zinc-600 rounded-xl p-2'>
        <h3 className='ml-2 w-full min-w-28 leading-8 text-left font-bold m-0 border-left'>快速开始</h3>
        <div className='flex flex-row mt-10 mb-10 relative'>
          <div className='flex flex-row pb-10 w-full border-0 border-b border-solid border-zinc-300 dark:border-zinc-600'>
            <div className='relative w-2/3 h-60 hover:-translate-y-1 transition-all duration-500'>
              <Image
                alt=''
                src={stepImages[0]}
                fill
                sizes='100vw'
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
            <div className='w-1/3 relative' >
              <h3 className='ml-2 min-w-28 leading-8 text-left font-bold m-0'>基于模板快速创建</h3>
              <ul className='mt-10'>
                <li className='mb-2' >模板商城中提供大量的模板供您挑选</li>
                <li className='mb-2' >挑选喜欢的模板进行编辑</li>
                <li className='mb-2' >编辑完成后即可保存为自己的私有页面</li>
              </ul>
              <Button className='h-8 absolute bottom-0 left-3 dark:text-amber-400 dark:border-amber-400 text-amber-600 border-amber-600' variant='outlined' startIcon={<Storefront/>} onClick={goStore}>
                去挑选模板
              </Button>
            </div>
          </div>
          <div className='absolute -top-14 right-6 flex flex-row justify-center items-center'>
            <RecommendIcon size={50} className='mr-2 rotate-12' />
            <b className='dark:text-rose-200 text-rose-400 '>推荐方案</b>
          </div>
        </div>
        <div className='flex flex-row mt-10 mb-10'>
          <div className='relative flex flex-row pt-4 w-1/2 border-0 border-r border-solid border-zinc-300 dark:border-zinc-600'>
            <div className='relative w-2/3 h-60 hover:-translate-y-1 transition-all duration-500'>
              <Image
                alt=''
                src={stepImages[1]}
                fill
                sizes='100vw'
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
            <div className='flex-1' >
              <h3 className='ml-2 min-w-28 leading-8 text-left font-bold m-0'>创建一个应用</h3>
            </div>
            <div className='absolute bottom-0 right-8 flex flex-col justify-center items-start'>
              <ul className='text-sm mb-4 pl-4'>
                <li className='mb-2' >先创建应用</li>
                <li className='mb-2' >再向应用添加页面</li>
              </ul>
              <Button className='h-8 w-40 dark:text-amber-400 dark:border-amber-400 text-amber-600 border-amber-600' variant='outlined' startIcon={<CreateNewFolder/>} onClick={goStore}>
                去创建应用
              </Button>
            </div>
          </div>
          <div className='flex flex-row pt-4 w-1/2 relative'>
            <div className='relative w-2/3 h-60 hover:-translate-y-1 transition-all duration-500'>
              <Image
                alt=''
                src={stepImages[2]}
                fill
                sizes='100vw'
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
            <div className='flex-1' >
              <h3 className='ml-2 min-w-28 leading-8 text-left font-bold m-0'>创建一个页面</h3>
            </div>
            <div className='absolute bottom-0 right-8 flex flex-col justify-center items-start'>
              <ul className='text-sm mb-4 pl-4'>
                <li className='mb-2' >创建一个空白页面</li>
                <li className='mb-2' >从头开始布局页面元素</li>
                <li className='mb-2' >上手难度较大</li>
              </ul>
              <Button className='h-8 w-40 dark:text-amber-400 dark:border-amber-400 text-amber-600 border-amber-600' variant='outlined' startIcon={<DesignServices/>} onClick={goStore}>
                去创建页面
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 w-full bg-neutral-100 dark:bg-neutral-800 border border-solid border-zinc-300 dark:border-zinc-600 rounded-xl p-2'>
        <h3 className='ml-2 min-w-28 leading-8 text-left font-bold m-0 border-left'>产品特色</h3>
        <Swiper lottieClassName='w-80' className='w-full p-10 shadow-sm' expand />
      </div>
    </>
  );
}
