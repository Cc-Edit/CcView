import Header from '@/components/Header';
import MenuList from '@/components/MenuList';
import PageLoading from '@/components/PageLoading';
import { UIEvent, useState, ReactNode, useEffect, WheelEvent } from 'react';
import { delay } from '@/utils/common';
interface LayoutProps {
  children?: ReactNode
  hideMenu?: boolean
  hideHead?: boolean
}
export default function Layout({ children, hideMenu = false, hideHead = false }: LayoutProps) {
  const [smallHead, setSmallHead] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const handleScroll = (event: UIEvent) => {
    if (event.currentTarget.scrollTop > 10) {
      setSmallHead(true);
    } else {
      setSmallHead(false);
    }
  };
  // 给左侧菜单动画让时间
  useEffect(() => {
    setPageLoading(true);
    delay(400).then(() => {
      setPageLoading(false);
    });
  }, [hideMenu]);
  return (
    <div className='min-w-full flex flex-col h-1 w-1 min-h-full'>
      <div className='flex flex-row min-w-full h-1 w-1 min-h-full overflow-hidden'>
        {
          hideMenu || <MenuList hide={hideMenu}/>
        }
        <div className={`${(hideHead && hideMenu) ? 'flex-1 overflow-hidden' : 'flex-1 hideScroll'}`} onScroll={handleScroll}>
          {
            hideHead || <Header hide={hideHead} isSmall={smallHead}/>
          }
          <div className='min-w-full h-1 w-1 min-h-full relative p-4  pt-6 pr-2'>
            {
              pageLoading ? <PageLoading/> : children
            }
          </div>
        </div>
      </div>
    </div>
  );
}