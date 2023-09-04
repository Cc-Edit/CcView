import ServerErrorIcon from '@/components/Svg/ServerErrorIcon';
import ErrorIcon from '@/components/Svg/ErrorIcon';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from '@/components/Logo';

export default function NotFound() {
  const router = useRouter();
  const { mt } = router.query;
  const isMaintaining = Boolean(mt);
  const [windowWidth, setWindowWidth] = useState(400);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      <Logo/>
      <div className='flex flex-col justify-center h-full w-full'>
        <div className='flex flex-col align-middle text-center justify-center'>
          {
            isMaintaining ? (
              <>
                <ErrorIcon width={windowWidth / 2} height={windowWidth / 4}/>
                <h2 className='text-2xl'>抱歉，服务器日常检修中~</h2>
                <p className='text-base'>服务器检修中，预计1小时后恢复正常，请耐心等候</p>
              </>
            ) : (
              <>
                <ServerErrorIcon width={windowWidth / 2} height={windowWidth / 4}/>
                <h2 className='text-2xl'>糟糕，服务器没有响应~</h2>
                <p className='text-base'>服务器出现未知错误，请检查您的链接，或访问其他页面</p>
                <div className='text-base'>
                  <Link className='text-yellow-400 pl-2 pr-2' href='/'>回首页</Link>
                  <Link className='text-yellow-400 pl-2 pr-2' href='/login'>去登录</Link>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}