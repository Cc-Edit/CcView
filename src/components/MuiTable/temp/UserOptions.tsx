import { Edit, LockPerson, DeleteForever, LockOpen, ReplayCircleFilled } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useAppSelector } from '@/store';
import { useState } from 'react';
import CreateUserDialog from '@/components/Dialog/CreateUserDialog';
import { updateUser, updateUserStatus } from '@api/user';
import { delay } from '@/utils/common';
import { useSnackbar } from 'notistack';
const tipArray = ['删除', '禁用', '启用'];
export default function UserOptions(data: Record<string, any>) {
  const { eventMap, ...userData } = data;
  const confirm = useConfirm();
  const userInfo = useAppSelector(state => state.global.userInfo);
  const { role: currentUserRole, uuid: currentUserId } = userInfo;
  const { uuid, status, name: currentName } = userData;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  function creatUserSubmit(data: Record<string, any>, refs: Record<string, any>) {
    const { avatar, email, name, password, phone, role } = data;
    const newData = { avatar, email, name, password, phone, role, uuid };
    if (!password) {
      delete newData.password;
    }
    const submitButtonRef = refs['submit-btn'];
    submitButtonRef?.current?.disableButton();
    updateUser(newData).then(({ isOk, msg }) => {
      if (isOk) {
        delay(300).then(() => {
          setOpenDialog(false);
          eventMap.refresh();
        });
      } else {
        enqueueSnackbar(`用户更新失败：${msg}`, {
          variant: 'warning'
        });
        submitButtonRef?.current?.enableButton();
      }
    })
      .catch(error => {
        enqueueSnackbar(`用户更新失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
        submitButtonRef?.current?.enableButton();
      });
  }
  function handleUpdate() {
    if (currentUserRole === 0 || currentUserId === uuid) {
      setOpenDialog(true);
    } else {
      enqueueSnackbar(`普通用户只能修改自己的资料`, {
        variant: 'warning'
      });
    }
  }

  function updateStatue(newStatus: number) {
    updateUserStatus({ uuid, status: newStatus }).then(({ isOk, msg }) => {
      if (isOk) {
        enqueueSnackbar(`用户已${tipArray[newStatus]}`, {
          variant: 'success'
        });
        eventMap.refresh();
      } else {
        enqueueSnackbar(`用户${tipArray[newStatus]}失败：${msg}`, {
          variant: 'warning'
        });
      }
    })
      .catch(error => {
        enqueueSnackbar(`用户${tipArray[newStatus]}失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
      });
  }
  function handleDelete() {
    if (currentUserRole === 0) {
      confirm({ title: '❗️  警告', description: `账号删除后会被强制下线，确认要删除用户 ${currentName} 吗？`, confirmationText: '确认', cancellationText: '取消' })
        .then(() => {
          updateStatue(0);
        })
        .catch(() => {});
    } else {
      enqueueSnackbar(`只有管理员可以删除用户`, {
        variant: 'warning'
      });
    }
  }
  function handleDisable() {
    if (currentUserRole === 0) {
      confirm({ title: '❗️  警告', description: `账号禁用后会被强制下线，确认要禁用用户 ${currentName} 吗？`, confirmationText: '确认', cancellationText: '取消' })
        .then(() => {
          updateStatue(1);
        })
        .catch(() => {});
    } else {
      enqueueSnackbar(`只有管理员可以修改用户状态`, {
        variant: 'warning'
      });
    }
  }
  return (
    <div className='flex flex-row items-center justify-center'>
      {
        status !== 0 && <Tooltip title='编辑'>
        <Edit className='text-sky-500 w-5 h-5 mr-2' onClick={handleUpdate} />
        </Tooltip>
      }
      {
        status === 2 && <Tooltip title='禁用'>
          <LockPerson className='text-orange-500 w-5 h-5 mr-2' onClick={handleDisable} />
        </Tooltip>
      }
      {
        status === 1 && <Tooltip title='启用'>
          <LockOpen className='text-green-500 w-5 h-5 mr-2' onClick={() => { updateStatue(2); }} />
        </Tooltip>
      }
      {
        status !== 0 && <Tooltip title='删除'>
          <DeleteForever className='text-red-500 w-5 h-5 mr-2' onClick={handleDelete} />
        </Tooltip>
      }
      {
        status === 0 && <Tooltip title='撤销删除'>
          <ReplayCircleFilled className='text-green-500 w-5 h-5 mr-2' onClick={() => { updateStatue(2); }} />
        </Tooltip>
      }
      <CreateUserDialog isUpdate={true} defaultVal={userData || undefined} open={openDialog} onClose={() => { setOpenDialog(false); }} onSubmit={creatUserSubmit} />
    </div>
  );
}
