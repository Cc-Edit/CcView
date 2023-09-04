import NotFoundIcon from '@/components/Svg/NotFoundIcon';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

export default function NotFound() {
  const [windowWidth, setWindowWidth] = useState(400);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      <Logo/>
      <div className='flex flex-col justify-center h-full w-full'>
        <div className='flex flex-col align-middle text-center justify-center'>
          <NotFoundIcon width={windowWidth / 2} height={windowWidth / 4}/>
          <h2 className='text-2xl'>抱歉，您访问的页面不存在~</h2>
          <p className='text-base'>请检查您输入的网址是否正确，或者点击下方链接继续浏览</p>
          <div className='text-base'>
            <Link className='text-yellow-400 pl-2 pr-2' href='/'>回首页</Link>
            <Link className='text-yellow-400 pl-2 pr-2' href='/login'>去登录</Link>
          </div>
        </div>
      </div>
    </>

  );
}