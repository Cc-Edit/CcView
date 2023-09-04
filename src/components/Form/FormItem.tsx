import { Controller, Control } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  TooltipProps,
  OutlinedInputProps
} from '@mui/material';
import { FormItemTempProp, FormConfigItem } from '@/types';
import PasswordItem from '@/components/Form/temp/PasswordItem';
import InputItem from '@/components/Form/temp/InputItem';
import SwitchItem from '@/components/Form/temp/SwitchItem';
import SelectItem from '@/components/Form/temp/SelectItem';
import SliderItem from '@/components/Form/temp/SliderItem';
import ButtonGroupItem from '@/components/Form/temp/ButtonGroupItem';
import CaptureItem from '@/components/Form/temp/CaptureItem';
import AvatarItem from '@/components/Form/temp/AvatarItem';
import SubmitButton from '@/components/Form/temp/SubmitButton';
import CancelButton from '@/components/Form/temp/CancelButton';
import HelperText from '@/components/Form/temp/HelperText';
import { forwardRef } from 'react';
interface FormItemProp {
  config: FormConfigItem
  control: Control
  isUpdate: boolean
  eventHandler:(type: string, data : Record<string, any>) => void
}

// 根据类型匹配不同的输入框
const MatchInputType = forwardRef((props: FormItemTempProp, ref) => {
  const { config } = props;
  const { properties } = config;
  const { type } = properties as OutlinedInputProps;
  switch (type) {
    case 'password':
      return <PasswordItem ref={ref} {...props}/>;
    case 'switch':
      return <SwitchItem ref={ref} {...props}/>;
    case 'select':
      return <SelectItem ref={ref} {...props}/>;
    case 'slider':
      return <SliderItem ref={ref} {...props}/>;
    case 'buttonGroup':
      return <ButtonGroupItem ref={ref} {...props}/>;
    case 'Avatar':
      return <AvatarItem ref={ref} {...props} />;
    default:
      return <InputItem ref={ref} {...props} />;
  }
});
MatchInputType.displayName = 'MatchInputType';
const FormItem = forwardRef((props: FormItemProp, ref) => {
  const { config, control, eventHandler, isUpdate = false } = props;
  const { name, component, properties, rules } = config;
  switch (component) {
    case 'Capture': {
      return <CaptureItem ref={ref} config={properties as TooltipProps} eventHandler={eventHandler} />;
    }
    case 'SubmitButton': {
      return <SubmitButton isUpdate={isUpdate} ref={ref} config={properties} eventHandler={eventHandler} />;
    }
    case 'CancelButton': {
      return <CancelButton ref={ref} config={properties} eventHandler={eventHandler} />;
    }
    default: {
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <FormControl className='w-full' variant='outlined'>
              <MatchInputType ref={ref} config={config} field={field} fieldState={fieldState}/>
              <FormHelperText className='text-red-600 ml-0'>
                <HelperText message={fieldState.error?.message || ''}/>
              </FormHelperText>
            </FormControl>
          )}
        />
      );
    }
  }
});

FormItem.displayName = 'FormItem';
export default FormItem;