import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DesignLayout from '@/components/Design/Layout';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDesignData, destroy } from '@/store/slice/Design';
import { setDesignId } from '@/store/slice/Global';

export default function DesignPage() {
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
  return loaded ? <DesignLayout /> : null;
}