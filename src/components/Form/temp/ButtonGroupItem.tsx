import {
  InputLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { forwardRef, MouseEvent } from 'react';
import { FormItemTempProp } from '@/types';
import IconGen from '@/components/IconGen';
// 按钮组
const ButtonGroupItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  const { type, options = [], ...buttonGroupProps } = properties;

  const handleChange = (event: MouseEvent<HTMLElement>, newValue: string | null,) => {
    field.onChange(newValue);
  };

  return (
    <>
      <InputLabel error={fieldState.invalid}>{buttonGroupProps.label}</InputLabel>
      <ToggleButtonGroup
        {...buttonGroupProps}
        {...field}
        onChange={handleChange}
      >
        {
          (options as Record<string, any>[])?.map((option, index) => {
            return (<ToggleButton key={`${option.title}-${index}`} value={option.value}>
              {
                option.icon && <IconGen icon={option.icon}/>
              }
              {option.title}
            </ToggleButton>);
          })
        }
      </ToggleButtonGroup>
    </>
  );
});
ButtonGroupItem.displayName = 'ButtonGroupItem';
export default ButtonGroupItem;