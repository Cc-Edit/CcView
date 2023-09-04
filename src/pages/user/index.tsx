import { useEffect, useState, useCallback } from 'react';
import { getUserList } from '@/api/user';
import { useSnackbar } from 'notistack';
import MuiTable from '../../components/MuiTable';
import UserQuery from '@/config/query/UserQuery';
import { debounce } from 'lodash';
import CreateUserDialog from '@/components/Dialog/CreateUserDialog';
import { useAppSelector } from '@/store';
import { createUser, CreateUser } from '@api/user';
import { delay } from '@/utils/common';

export default function UserPage() {
  const userInfo = useAppSelector(state => state.global.userInfo);
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState({
    pageSize: 10,
    page: 0
  });
  const [userList, setUserList] = useState<Record<string, any>[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  function resetQuery() {
    setQuery({
      pageSize: 10,
      page: 0
    });
  }

  function handleCreat() {
    if (userInfo && userInfo.role === 0) { // 管理员
      setOpenDialog(true);
    } else {
      enqueueSnackbar(`只有管理员有权限创建用户`, {
        variant: 'warning'
      });
    }
  }

  // 获取用户列表
  const getUserData = useCallback(debounce((data: Record<string, any>) => {
    getUserList(data).then(({ isOk, msg, data: { list, count }}) => {
      if (isOk) {
        setUserList(list);
        setCount(count);
      } else {
        enqueueSnackbar(`获取用户列表失败：${msg}`, {
          variant: 'warning'
        });
        setUserList([]);
      }
      setLoading(false);
    })
      .catch(error => {
        enqueueSnackbar(`获取用户列表失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
        setUserList([]);
        setLoading(false);
      });
  }, 600), []);

  function refresh() {
    setLoading(true);
    getUserData(query);
  }

  function creatUserSubmit(data: Record<string, any>, refs: Record<string, any>) {
    const submitButtonRef = refs['submit-btn'];
    submitButtonRef?.current?.disableButton();
    createUser(data as CreateUser).then(({ isOk, msg }) => {
      if (isOk) {
        delay(300).then(() => {
          setOpenDialog(false);
          refresh();
        });
      } else {
        enqueueSnackbar(`用户创建失败：${msg}`, {
          variant: 'warning'
        });
        submitButtonRef?.current?.enableButton();
      }
    })
      .catch(error => {
        enqueueSnackbar(`用户创建失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
        submitButtonRef?.current?.enableButton();
      });
  }
  
  useEffect(() => {
    refresh();
  }, [query]);
  const eventMap = {
    resetQuery,
    handleCreat,
    refresh
  };
  return (
    <div className={``}>
      <MuiTable queryConfig={UserQuery} rowData={userList} {...{ count, setQuery, query, loading, eventMap }} />
      <CreateUserDialog open={openDialog} onClose={() => { setOpenDialog(false); }} onSubmit={creatUserSubmit} />
    </div>
  );
}