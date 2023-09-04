import { MoreHoriz, DriveFileMove, FileCopy, Edit, Delete, Store } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState, MouseEvent, useRef } from 'react';
import { MoreMenuEvent } from '@/types';
interface MoreIconProp {
  type: number
  uuid: string
  cover?: string
  title: string
  className: string
  onEvent: (params: MoreMenuEvent) => void
}

export default function MoreIcon({ type, uuid, title, cover = '', className, onEvent }: MoreIconProp) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const moreIconRef = useRef(null);
  const handleOpenUserMenu = () => {
    setAnchorElUser(moreIconRef.current);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const clickEventHandler = (eventType: string) => {
    handleCloseUserMenu();
    onEvent && onEvent({
      type,
      title,
      cover,
      eventType,
      uuid
    });
  };
 
  return (
    <>
      <MoreHoriz ref={moreIconRef} className={className} onClick={handleOpenUserMenu} />
      <Menu
        className='-mt-1'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <div className='bg-zinc-100 dark:bg-zinc-600 p-1 dark:border-zinc-500 border-zinc-300 border border-solid rounded-md'>
          <MenuItem className='rounded-md' onClick={() => { clickEventHandler('edit'); }}>
            <ListItemIcon>
              <Edit fontSize='small'/>
            </ListItemIcon>
            <ListItemText>修改信息</ListItemText>
          </MenuItem>
          {
            type === 0 && (
              <>
                <MenuItem className='rounded-md' onClick={() => { clickEventHandler('copy'); }}>
                  <ListItemIcon>
                    <FileCopy fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>复制一份</ListItemText>
                </MenuItem>
                <MenuItem className='rounded-md' onClick={() => { clickEventHandler('move'); }}>
                  <ListItemIcon>
                    <DriveFileMove fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>移动页面</ListItemText>
                </MenuItem>
                <MenuItem className='rounded-md' onClick={() => { clickEventHandler('template'); }}>
                  <ListItemIcon>
                    <Store fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>保存为模板</ListItemText>
                </MenuItem>
              </>
            )
          }
          <MenuItem className='rounded-md' onClick={() => { clickEventHandler('delete'); }}>
            <ListItemIcon>
              <Delete fontSize='small'/>
            </ListItemIcon>
            <ListItemText>删除{type === 0 ? '页面' : '应用'}</ListItemText>
          </MenuItem>
        </div>
      </Menu>
    </>
  );
}