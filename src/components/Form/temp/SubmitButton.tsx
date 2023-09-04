import {
  Button,
  LinearProgress
} from '@mui/material';
import { useState, forwardRef, useImperativeHandle } from 'react';
interface SubmitButtonProp {
  eventHandler:(type: string, data : Record<string, any>) => void,
  config: Record<string, any>
  isUpdate: boolean
}
const SubmitButton = forwardRef(({ eventHandler, config, isUpdate }: SubmitButtonProp, ref) => {
  const [loginState, setLoginState] = useState(false);
  let { buttonText = ['登录中...', '登录'] } = config;
  if (isUpdate) buttonText = ['更新中...', '更新'];
  const [ingText, defaultText] = buttonText;
  function disableButton() {
    setLoginState(true);
  }
  function enableButton() {
    setLoginState(false);
  }
  useImperativeHandle(ref, () => ({
    disableButton,
    enableButton
  }));
  return (
    <Button
      className='relative w-full'
      size='medium'
      disabled={loginState}
      variant='contained'
      color='primary'
      type='submit'
    >
      {
        loginState ? ingText : defaultText
      }
      {
        loginState && <LinearProgress className='absolute bottom-0 left-0 right-0 text-yellow-400 text-opacity-30'
                                      color='inherit'/>
      }
    </Button>
  );
});
SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;