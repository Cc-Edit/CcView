import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { destroy, fetchTemplateData } from '@/store/slice/Design';
import { setDesignId } from '@/store/slice/Global';
import Preview from '@/components/Design/Preview';

export default function TemplatePage() {
  const router = useRouter();
  const loaded = useAppSelector(state => state.design.loaded);
  const { tid = '' } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTemplateData(tid as string));
    dispatch(setDesignId(tid as string));
    // 移除数据
    return () => {
      dispatch(destroy());
    };
  }, [tid]);
  return (
    <div className={`${loaded ? 'opacity-100' : 'opacity-0'} overflow-hidden transition-all duration-700 absolute left-0 right-0 top-0 bottom-0`}>
      <Preview />
    </div>
  );
}