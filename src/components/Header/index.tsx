import { MouseEvent, useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Divider, Tooltip, MenuItem, Menu, Avatar, ListItemText, ListItemIcon } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { getRandomItem, removeStorage } from '@/utils/common';
import { HeadMenuData, UserRole, UserStatus, findMenuByHref } from '@/config/data';
import IconGen from '@/components/IconGen';
import ThemeSwitch from '@/components/ThemeSwitch';
import { getUserInfo } from '@api/user';
import { logout } from '@api/auth';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { Constant } from '@/config/constant';
import { setUserInfo } from '@/store/slice/Global';
import { useAppDispatch, useAppSelector } from '@/store';

type HeaderProp = {
  isSmall: boolean,
  hide: boolean
}

function Header({ isSmall, hide = false }: HeaderProp) {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const userInfo = useAppSelector(state => state.global.userInfo);

  const className = {
    body: `${hide ? 'h-0 opacity-0 overflow-hidden' : (isSmall ? 'h-12 dark:bg-opacity-90 bg-opacity-90' : 'h-14 dark:bg-opacity-0 bg-opacity-0')} left-0 right-0 absolute top-0 transition-all duration-300 w-full dark:bg-neutral-800 bg-neutral-100 flex flex-row justify-center z-30 items-center`
  };

  async function initUser() {
    if (hide) return;
    const userData = await getUserInfo();
    if (!userData?.isOk) {
      enqueueSnackbar(`获取用户信息失败：${userData?.msg}`, {
        variant: 'warning'
      });
    } else {
      const user = userData.data;
      dispatch(setUserInfo({
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        uuid: user.uuid,
        role: user.role,
        status: user.status
      }));
    }
  }
  
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = async() => {
    confirm({ title: '⚠️  注意', description: '确认退出登录吗？', confirmationText: '确认', cancellationText: '取消' })
      .then(() => {
        logout().then(() => {
          removeStorage(Constant.TokenKey);
          window.location.replace('/login');
        });
      })
      .catch(() => {
      });
  };

  // 获取当前title
  useLayoutEffect(() => {
    const pathname = router.pathname;
    const activeMenu = findMenuByHref(pathname);
    setTitle(activeMenu?.contentTitle || activeMenu?.title || '');
  }, [router]);

  useEffect(() => {
    initUser();
  }, []);

  return (
    <div className={className.body}>
      <h3 className='text-lg'>{title}</h3>
      <ThemeSwitch className='absolute right-24'/>
      <Tooltip title='用户设置'>
        <IconButton className='h-11 w-11 border border-solid border-amber-500 right-6 absolute' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar className='h-9 w-9' alt='User' src={userInfo.avatar}/>
        </IconButton>
      </Tooltip>
      <Menu
        className='mt-11'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
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
          <div className='px-6 py-4 text-sm flex flex-col'>
            <span>用户名：{userInfo.name}</span>
            <span>email: {userInfo.email}</span>
            <span>角色: {UserRole[userInfo.role || 0]}</span>
            <span>状态: {UserStatus[userInfo.status || 0]}</span>
          </div>
          {/* <Divider className='mb-1 mt-1'/>* /}
          {/* {HeadMenuData.map(menu => (*/}
          {/*  <MenuItem key={menu.key} disabled={menu.disable}*/}
          {/*            className={menu.disable ? 'cursor-not-allowed pointer-events-auto' : ''}*/}
          {/*  >*/}
          {/*    <ListItemIcon>*/}
          {/*      {*/}
          {/*        <IconGen icon={menu.icon}/>*/}
          {/*      }*/}
          {/*    </ListItemIcon>*/}
          {/*    <ListItemText>{menu.title}</ListItemText>*/}
          {/*  </MenuItem>*/}
          {/* ))}*/}
          <Divider className='mb-1 mt-1'/>
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <ExitToApp fontSize='small'/>
            </ListItemIcon>
            <ListItemText>退出登录</ListItemText>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export default Header;