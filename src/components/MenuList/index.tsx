import { useState, MouseEvent, useEffect } from 'react';
import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { List, IconButton } from '@mui/material';
import Logo from '@/components/Logo';
import { MenuData, findMenuByHref } from '@/config/data';
import { MenuType } from '@/types';
import style from './Menu.module.css';
import MenuItem from './MenuItem';
import PopMenuItem from './PopMenuItem';
import { useRouter } from 'next/router';

interface MenuListProps {
  hide?: boolean
}

export default function MenuList({ hide = false } : MenuListProps) {
  const [expandMap, setExpandMap] = useState<Record<string, any>>({});
  const [selectMenu, setSelectMenu] = useState<MenuType | null>(null);
  const [activeKey, setActive] = useState('home');
  const [expand, setExpand] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  // 菜单选中事件
  const handleSelect = ({ key, href, child = [] }: MenuType, value?: boolean) => {
    if (child.length > 0) {
      // 菜单展开时可以同时显示多个子菜单，菜单收起时，只展示最新hover的一个
      let oldMapData = expand ? expandMap : {};
      setExpandMap({
        ...oldMapData,
        [key]: value !== undefined ? value : !(expandMap[key])
      });
    } else {
      setActive(key);
    }
    if (href) {
      router.push(href);
    }
  };
  // 初始化完成后选中当前菜单
  useEffect(() => {
    const { pathname } = router;
    const activeMenu = findMenuByHref(pathname);
    setActive(activeMenu?.key || 'home');
  }, [router]);
  // 缩小后的菜单hover弹出子菜单
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>, menu: MenuType) => {
    setSelectMenu(menu);
    setAnchorElUser(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setSelectMenu(null);
    setAnchorElUser(null);
  };

  return (
    <div className={`${hide ? 'w-0 opacity-0 overflow-hidden' : (expand ? 'w-56' : 'w-16')} ${style.list_container} dark:bg-neutral-800 bg-neutral-50 dark:border-zinc-700 border-zinc-200 z-40`}>
      <div className='dark:bg-neutral-800 bg-neutral-50 h-16 overflow-hidden'>
        <Logo className='z-40 float-left origin-top-left' hideOth={!expand}
              style={{ transform: `${expand ? 'translate(22px, 0)' : 'translate(-28px, 0)'} scale(0.6)` }}/>
      </div>
      <div className='flex-1 overflow-hidden hover:overflow-y-auto'>
        <List className={`${expand ? 'w-56' : 'w-16 p-1'} menu-list overflow-hidden`}>
          <MenuItem data={MenuData} isSmall={expand} activeKey={activeKey} expandMap={expandMap} onMouseEnter={handlePopoverOpen} onMenuClick={handleSelect} />
        </List>
      </div>
      <div className='absolute bottom-30 -right-2'>
        <IconButton className='dark:bg-zinc-700 bg-zinc-500 dark:text-zinc-300 text-zinc-500 dark:bg-opacity-0 bg-opacity-0 w-6 h-6 transition-all duration-1000'
                    onClick={() => {
                      setExpand(!expand);
                      handlePopoverClose();
                    }}>
          {
            <KeyboardDoubleArrowLeft className={`${expand ? '' : 'rotate-180'} duration-600 transition-all`}/>
          }
        </IconButton>
      </div>
      {
        ((selectMenu?.child?.length || 0) > 0 && !expand) && <PopMenuItem data={selectMenu} anchorEl={anchorElUser} activeKey={activeKey} onMenuClick={handleSelect} onClose={handlePopoverClose} />
      }
    </div>
  );
}