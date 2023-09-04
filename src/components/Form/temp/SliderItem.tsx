import {
  InputLabel,
  Slider
} from '@mui/material';
import { forwardRef } from 'react';
import { FormItemTempProp } from '@/types';
// 基础滑块组件
const SliderItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  const { type, options, ...selectProps } = properties;
  return (
    <>
      <InputLabel error={fieldState.invalid}>{selectProps.label}</InputLabel>
      <Slider
        defaultValue={field.value}
        {...field}
        {...selectProps}
      />
    </>
  );
});
SliderItem.displayName = 'BaseSliderItem';
export default SliderItem;