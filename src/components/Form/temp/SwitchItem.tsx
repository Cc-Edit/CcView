import {
  Switch,
  FormControlLabel
} from '@mui/material';
import { forwardRef, ChangeEvent } from 'react';
import { FormItemTempProp } from '@/types';
// 基础开关
const SwitchItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  const { label, type, labelPlacement, ...switchProps } = properties;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(!field.value);
  };
  return (
    <FormControlLabel
      control={<Switch {...field} {...switchProps} onChange={handleChange} />}
      label={properties.label}
      labelPlacement={labelPlacement}
    />
  );
});
SwitchItem.displayName = 'BaseSwitchItem';
export default SwitchItem;