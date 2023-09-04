import {
  TextField
} from '@mui/material';
import { forwardRef } from 'react';
import { FormItemTempProp } from '@/types';
// 基础输入框
const InputItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  return (
    <TextField
      {...field}
      {...properties}
      error={fieldState.invalid}
    />
  );
});
InputItem.displayName = 'BaseInputItem';
export default InputItem;