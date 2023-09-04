import { MenuType } from '@/types';
import { List, ListItemButton, ListItemText, Menu } from '@mui/material';

interface PopMenuItemProp {
  data: MenuType | null
  anchorEl: null | HTMLElement
  activeKey: string
  onMenuClick: Function
  onClose: () => void
}

export default function PopMenuItem({ anchorEl, activeKey, data, onMenuClick, onClose }: PopMenuItemProp) {
  return <Menu
    className='z-10 transition-all duration-700 expand'
    anchorEl={anchorEl}
    keepMounted
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'left'
    }}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    <List component='div' disablePadding className='p-0 w-40 rounded-3xl' onMouseLeave={onClose}>
      {
        data && data?.child?.map(subMenu => (
          <ListItemButton key={subMenu.key} className={activeKey === subMenu.key ? 'active-sub' : ''} onClick={() => {
            onMenuClick(subMenu);
          }}>
            <ListItemText>{subMenu.title}</ListItemText>
          </ListItemButton>
        ))
      }
    </List>
  </Menu>;
}