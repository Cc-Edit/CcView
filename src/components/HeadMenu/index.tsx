import { IconButton, Tooltip } from '@mui/material';
import { Microwave, Visibility } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/store';
import { switchAttr } from '@/store/slice/Global';
import { useRouter } from 'next/router';

export default function HeadMenu(props: Record<string, any>) {
  const router = useRouter();
  const { className } = props;
  const showAttr = useAppSelector(state => state.global.showAttr);
  const designId = useAppSelector(state => state.global.designId);
  const dispatch = useAppDispatch();

  function changeShowAttr() {
    dispatch(switchAttr(!showAttr));
  }

  function goPreview() {
    window.open(`${document.location.origin}/preview/${designId}`, '_blank');
  }
  return (
    <div className={className}>
      <Tooltip enterDelay={300} title='预览当前设计'>
        <IconButton className={`border-slate-400 h-7 w-7 border border-solid mr-4`} onClick={goPreview} sx={{ p: 0 }}>
          <Visibility className={`text-slate-400 h-5 w-5` } />
        </IconButton>
      </Tooltip>
      <Tooltip enterDelay={300} title={`${showAttr ? '隐藏右侧属性栏' : '显示右侧属性栏'}`}>
        <IconButton className={`${showAttr ? 'border-amber-400' : 'border-slate-400'} h-7 w-7 border border-solid mr-4`} onClick={changeShowAttr} sx={{ p: 0 }}>
          <Microwave className={`${showAttr ? 'text-amber-400' : 'text-slate-400'} h-5 w-5` } />
        </IconButton>
      </Tooltip>
    </div>
  );
}