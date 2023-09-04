import { Provider } from 'react-redux';
import { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

import NProgress from 'nprogress';
import store from '../store';
import 'nprogress/nprogress.css';
import '@/assets/main.css';
import '@/assets/sketch.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ThemeModeContext from '@/config/context/ThemeModeContext';
import { Constant, isHideMenu } from '@/config/constant';
import getTheme from '@/config/theme';
import { getStorage } from '@/utils/common';
import Layout from '@/components/Layout';
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(getStorage(Constant.ThemeKey, 'dark') as 'light'|'dark');
  const themeMode = useMemo(() => ({
      toggleColorMode: (newMode: 'light'|'dark' = 'light') => {
        setMode(newMode);
      }
    }), []);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const router = useRouter();

  useLayoutEffect(() => {
    // 组织窗口放大缩小，避免和Sketch冲突
    document.addEventListener('wheel', e => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    }, {
      passive: false // Add this
    });
    document.documentElement.classList[mode === 'dark' ? 'add' : 'remove']('dark');
  }, [mode]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(router);
    const { pathname, asPath } = router;
    if (pathname === '/' && pathname !== asPath) {
      router.push(asPath);
    }
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const getBaiduScriptTag = () => {
    return {
      __html: `
       var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5375c7bd8bf2c24a91b24fceced1e007";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`
    };
  };

  return (
    <>
      <Head>
        <title>Cc-Edit</title>
        <meta name='viewport' content='initial-scale=1, width=device-width maximum-scale=1.0'/>
        <script dangerouslySetInnerHTML={getBaiduScriptTag()}/>
      </Head>
      <CssBaseline/>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ConfirmProvider defaultOptions={{
              confirmationText: '确认', cancellationText: '取消',
              cancellationButtonProps: { className: 'bg-zinc-500 text-zinc-300' },
              confirmationButtonProps: { className: 'bg-amber-500 text-zic-300' }
            }}>
              <SnackbarProvider
                autoHideDuration={3000}
                maxSnack={3}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Layout hideMenu={isHideMenu(false, router.pathname)} hideHead={isHideMenu(true, router.pathname)}>
                  <Component {...pageProps} />
                </Layout>
              </SnackbarProvider>
            </ConfirmProvider>
          </Provider>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </>
  );
}
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false
});
