import styles from './Login.module.css';
import Banner from '@/components/Banner';
import { useState, useEffect } from 'react';
import { login } from '@api/auth';
import { useSnackbar } from 'notistack';
import { Constant } from '@/config/constant';
import { useRouter } from 'next/router';
import Copyright from '@/components/Copyright';
import Logo from '@/components/Logo';
import { setStorage, getStorage, delay } from '@/utils/common';
import FormFactory from '@/components/Form/FormFactory';
import LoginForm from '@/config/form/LoginForm';
import { EventParams } from '@/types';
import { LoginData } from '@/types/form';
import { destroy } from '@/store/slice/Global';
import { useAppDispatch } from '@/store';
let showTooltip = false;
export default function LoginPage() {
  const router = useRouter();
  const [loginState, setLoginState] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const onSubmit = async(data: LoginData, refs: Record<string, any>) => {
    const captureRef = refs['captcha-image'];
    const submitButtonRef = refs['submit-btn'];
    if (loginState) {
      return;
    }
    submitButtonRef?.current?.disableButton();
    setLoginState(true);
    const res = await login({
      ...data,
      captureEncode: getStorage(Constant.CaptureEncode, '')
    }).catch(error => {
      enqueueSnackbar(`登录失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
        variant: 'error'
      });
      captureRef?.current?.refreshCaptcha();
      setLoginState(false);
      submitButtonRef?.current?.enableButton();
    });
    if (res?.isOk) {
      enqueueSnackbar(`用户 @${data.username} 登录成功!`, {
        variant: 'success'
      });
      setStorage(Constant.TokenKey, res.data.access_token);
      router.push('/');
    } else {
      enqueueSnackbar(`登录失败：${res?.msg}`, {
        variant: 'warning'
      });
      captureRef?.current?.refreshCaptcha();
      setLoginState(false);
      submitButtonRef?.current?.enableButton(); 
    }
  };

  async function onEvent(eventParams: EventParams) {
    const { type, data, form: { control, resetField }, refs } = eventParams;

    if (type === 'submit') {
      await onSubmit(data as LoginData, refs);
    }
    if (type === 'refreshCaptcha') {
      resetField('captcha');
    }
  }
  useEffect(() => {
    dispatch(destroy());
    !showTooltip && delay(1000).then(() => {
      enqueueSnackbar(<span>欢迎试用 🎉  <br/>测试数据不定时清除~ <br/>试用账号：Guest、Guest1、Guest2、Guest3、Guest4、Guest5</span>, {
        variant: 'default',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        autoHideDuration: 10000
      });
    });
    showTooltip = true;
  }, []);
  return (
    <>
      <Logo/>
      <Banner/>
      <div className={`${styles.container} dark:bg-neutral-800 dark:bg-opacity-70 dark:border-neutral-700 dark:shadow-neutral-700 dark:hover:border-neutral-600 dark:hover:shadow-neutral-800 bg-zinc-200 bg-opacity-70 border-neutral-300 shadow-neutral-200 hover:border-neutral-300 hover:shadow-neutral-200`}>
        <h4 className={styles.title}>登录</h4>
        <FormFactory
          config={LoginForm}
          onEvent={onEvent} />
      </div>
      <Copyright/>
    </>
  );
}

