import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDesignData, destroy } from '@/store/slice/Design';
import { setDesignId } from '@/store/slice/Global';
import Preview from '@/components/Design/Preview';

export default function PreviewPage() {
  const router = useRouter();
  const loaded = useAppSelector(state => state.design.loaded);
  const { did = '' } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDesignData(did as string));
    dispatch(setDesignId(did as string));
    // 移除数据
    return () => {
      dispatch(destroy());
    };
  }, [did]);
  return (
    <div className={`${loaded ? 'opacity-100' : 'opacity-0'} overflow-hidden transition-all duration-700 absolute left-0 right-0 top-0 bottom-0`}>
      <Preview />
    </div>
  );
}