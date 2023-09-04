import {
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { forwardRef } from 'react';
import { FormItemTempProp } from '@/types';
// 基础开关选择
const SelectItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  const { type, options, ...selectProps } = properties;
  return (
    <>
      <InputLabel error={fieldState.invalid}>{selectProps.label}</InputLabel>
      <Select
        className=''
        {...field}
        {...selectProps}
        error={fieldState.invalid}
      >
        {
          options.map((option: { title: string, value: any}) => {
            return <MenuItem key={option.title} value={option.value}>{option.title}</MenuItem>;
          })
        }
      </Select>
    </>

  );
});
SelectItem.displayName = 'BaseSelectItem';
export default SelectItem;