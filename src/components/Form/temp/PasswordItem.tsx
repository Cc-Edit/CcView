import {
  InputAdornment,
  IconButton,
  TextField,
  TextFieldProps
} from '@mui/material';
import EyesIcon from '@/components/Svg/EyesIcon';
import { FormItemTempProp } from '@/types';
import { useState, forwardRef } from 'react';

const PasswordItem = forwardRef((props: FormItemTempProp, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { config: { properties }, field, fieldState } = props;
  const { type, ...othProps } = (properties as TextFieldProps);
  return (
    <TextField
      {...field}
      {...othProps}
      type={showPassword ? 'text' : 'password'}
      error={fieldState.invalid}
      InputProps={{
        endAdornment: <InputAdornment position='end'>
          <IconButton
            className='mr-1 bg-opacity-0 p-1 w-10 h-10'
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={event => event.preventDefault()}
            edge='end'
          >
            <EyesIcon close={!showPassword} color={'#d4d4d8'} size={24}></EyesIcon>
          </IconButton>
        </InputAdornment>
      }}
    />
  );
});
PasswordItem.displayName = 'PasswordItem';
export default PasswordItem;