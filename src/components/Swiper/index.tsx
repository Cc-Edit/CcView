import { HomeSwiperData } from '@/config/data';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { MobileStepper } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import Lottie from '@/components/Lottie';

interface SwiperProps {
  lottieClassName?: string
  className?: string
  expand?: boolean
}

export default function Swiper({ lottieClassName = 'w-80', className, expand = false }: SwiperProps) {
  const [activeStep, setActive] = useState(0);
  const handleStepChange = (step: number) => {
    setActive(step);
  };
  const swiper = HomeSwiperData.map((item, index) => {
    return (
      <div key={index} className={`${index === HomeSwiperData.length - 1 ? '' : 'border-b '}${expand ? 'border-0 border-dashed border-zinc-200 dark:border-zinc-700 pb-5 pt-5' : ''} flex flex-row overflow-hidden`}>
        {
          expand ? (
            <>
              {
                (index % 2 === 0)
                && <div className='flex-1 items-center justify-center flex flex-row'><Lottie autoPlay={true} path={item.lottiePath} className={`${lottieClassName}`}/></div>
              }
              <div
                className='pt-8 flex-1 flex flex-col justify-start items-center dark:text-zinc-300 text-zinc-600 tracking-wider'>
                <h2>{item.title}</h2>
                <ul>
                  {
                    item.content.map((content, ctxIndex) => <li key={ctxIndex} className='mb-2 mt-2 '>{content}</li>)
                  }
                </ul>
              </div>
              {
                (index % 2 !== 0)
                && <div className='flex-1 items-center justify-center flex flex-row'><Lottie autoPlay={true} path={item.lottiePath} className={`${lottieClassName}`}/></div>
              }
            </>
          ) : (
            <>
              <Lottie autoPlay={true} path={item.lottiePath} className={lottieClassName}/>
              <div
                className='pt-8 flex-1 flex flex-col justify-start items-center dark:text-zinc-300 text-zinc-600 tracking-wider'>
                <h2>{item.title}</h2>
                <ul>
                  {
                    item.content.map((content, ctxIndex) => <li key={ctxIndex} className='mb-2 mt-2 '>{content}</li>)
                  }
                </ul>
              </div>
            </>
          )
        }

      </div>
    );
  });
  return <div className={`${className} relative min-w-160 flex flex-col shadow-inner rounded-xl`}>
    {
      expand ? swiper : (
        <>
          <AutoPlaySwipeableViews
            axis='x'
            interval={8000}
            index={activeStep}
            onChangeIndex={handleStepChange}
            springConfig={{
              duration: '2s',
              easeFunction: '',
              delay: '0s'
            }}
          >
            {swiper}
          </AutoPlaySwipeableViews>
          <MobileStepper
            className='justify-center bg-opacity-0 bg-zinc-400 relative -top-4 text-zinc-700'
            steps={HomeSwiperData.length + 1}
            position='static'
            variant='progress'
            activeStep={activeStep + 1}
            nextButton={null}
            backButton={null}
          />
        </>
      )

    }
  </div>;
}