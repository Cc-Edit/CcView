import { useEffect, useState } from 'react';
import { getUserInfo, getUserList } from '@/api/user';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
export default function UserDetail() {
  const router = useRouter();
  const { uid = '' } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState<Record<string, any>>({});

  useEffect(() => {
    getUserInfo({ uid }).then(({ isOk, msg, data = [] }) => {
      if (isOk) {
        setUserData(data);
      } else {
        enqueueSnackbar(`获取用户信息失败：${msg}`, {
          variant: 'warning'
        });
      }
    })
      .catch(error => {
        enqueueSnackbar(`获取用户信息失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
      });
  }, []);
  return (
    <div className={`overflow-hidden transition-all duration-700 absolute left-0 right-0 top-0 bottom-0`}>
      222
    </div>
  );
}