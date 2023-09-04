import { LinearProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export default function PageLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <div className='w-full flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 h-full'>
      <div className='w-120'>
        <LinearProgress variant='determinate' value={progress} />
        <b className='w-full inline-block text-center text-sm mt-2 text-zinc-600 dark:text-zinc-400'>努力加载中...</b>
      </div>
    </div>
  );
}
