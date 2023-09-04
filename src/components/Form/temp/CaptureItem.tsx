import {
  Tooltip,
  TooltipProps
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getCaptcha } from '@api/auth';
import { Constant } from '@/config/constant';
import { setStorage } from '@/utils/common';
interface CaptureItemProp {
  config:TooltipProps,
  eventHandler:(type: string, data : Record<string, any>) => void
}
const CaptureItem = forwardRef(({ config, eventHandler }: CaptureItemProp, ref) => {
  const [captcha, setCaptcha] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const refreshCaptcha = () => {
    eventHandler('refreshCaptcha', {});
    getCaptcha({
      w: 170,
      h: 44
    }).then(res => {
      if (res.isOk) {
        setStorage(Constant.CaptureEncode, res.data.captureEncode);
        setCaptcha(res.data.image);
      } else {
        enqueueSnackbar(`获取验证码失败：${res.msg}`, {
          variant: 'warning'
        });
      }
    })
      .catch(error => {
        enqueueSnackbar(`获取验证码失败：${error}`, {
          variant: 'error'
        });
      });
  };
  useEffect(() => {
    refreshCaptcha();
  }, []);
  useImperativeHandle(ref, () => ({
    refreshCaptcha
  }));
  return (
    <Tooltip {...config}>
      <div className='pl-2 pr-2 w-1/2' dangerouslySetInnerHTML={{ __html: captcha }}
           onClick={refreshCaptcha}></div>
    </Tooltip>
  );
});
CaptureItem.displayName = 'CaptureItem';
export default CaptureItem;