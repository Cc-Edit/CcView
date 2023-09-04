import { MenuType } from '@/types';
import { Fragment } from 'react';
import IconGen from '@/components/IconGen';
import SubMenuItem from './SubMenuItem';
import { ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

interface MenuItemProp {
  data: MenuType[]
  isSmall: boolean // 菜单折叠
  activeKey: string
  expandMap: Record<string, any>
  onMouseEnter: Function
  onMenuClick: Function
}

export default function MenuItem({ isSmall, activeKey, data, expandMap, onMouseEnter, onMenuClick }: MenuItemProp) {
  return data.map(menu => (
    <Fragment key={menu.key}>
      <ListItemButton
        className={`${isSmall ? '' : 'flex-col rounded-xs p-1 mb-2 '}${(activeKey === menu.key || (menu.childKey as string[])?.includes(activeKey)) ? ' active' : ''}`}
        aria-describedby={`mouse-over-popover-${menu.key}`}
        onMouseEnter={event => {
          onMouseEnter(event, menu);
        }}
        onClick={() => {
          onMenuClick(menu);
        }}>
        <ListItemIcon className={`${isSmall ? '' : 'mb-1 justify-center'}`}>
          {
            menu.icon && <IconGen className={isSmall ? '' : 'w-6 h-6'} icon={menu.icon}/>
          }
        </ListItemIcon>
        <ListItemText
          className={`${isSmall ? '' : 'expand m-0 text-xs w-16 inline-block text-center overflow-ellipsis'}`}>{menu.title}</ListItemText>
        {
          ((menu?.child?.length || 0) > 0 && isSmall)
          && <ExpandMore className={`${expandMap[menu.key] ? 'rotate-180' : ''} transition-all duration-300`}/>
        }
      </ListItemButton>
      {
        ((menu?.child?.length || 0) > 0 && isSmall) && <SubMenuItem data={menu} expandMap={expandMap} activeKey={activeKey} onMenuClick={onMenuClick}/>
      }
    </Fragment>
  ));
}