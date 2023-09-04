import { ChangeEvent, useEffect } from 'react';
import { OutlinedInput } from '@mui/material';
interface SelectProps {
  [key: string]: any,
  onChange: Function
}
export default function Select(props: SelectProps) {
  const { eventMap, is, className = '', defaultValue, value, label = '', onChange, options = [], ...prop } = props;
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }
  const computedValue = value ?? defaultValue ?? '';
  useEffect(() => {
    if (computedValue !== value) {
      onChange?.(computedValue);
    }
  }, []);

  return (
    <div className={`${className} w-full flex justify-start items-center`}>
      <span className='text-xs mr-2'>{label}</span>
      <OutlinedInput
        className='h-10 flex-1'
        value={computedValue}
        onChange={handleChange}
        {...prop}
      />
    </div>
  );
}