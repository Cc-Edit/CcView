import {
  Button
} from '@mui/material';
import { useState, forwardRef, useImperativeHandle } from 'react';
interface CancelButtonProp {
  eventHandler:(type: string, data : Record<string, any>) => void,
  config: Record<string, any>
}
const CancelButton = forwardRef(({ eventHandler, config }: CancelButtonProp, ref) => {
  const [loginState, setLoginState] = useState(false);
  const { buttonText = '取消' } = config;
  function handleCancel() {
    eventHandler('cancel', {});
  }
  return (
    <Button
      className='relative w-full bg-neutral-400 border-neutral-500'
      size='medium'
      disabled={loginState}
      variant='outlined'
      color='primary'
      onClick={handleCancel}
    >
      {
        buttonText
      }
    </Button>
  );
});
CancelButton.displayName = 'SubmitButton';
export default CancelButton;