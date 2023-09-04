import { useEffect } from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
interface SelectProps {
  [key: string]: any,
  onChange: Function
}
export default function Select(props: SelectProps) {
  const { eventMap, className = '', defaultValue, value, label = '', onChange, options = [] } = props;
  function handleChange(event: SelectChangeEvent) {
    onChange?.(event.target.value);
  }
  const computedValue = value ?? defaultValue;
  useEffect(() => {
    if (computedValue !== value) {
      onChange?.(computedValue);
    }
  }, []);
  const OptionsChild = (options as Record<string, any>[]).map(option => {
    const { value, label } = option;
    return <MenuItem key={option.value} value={value}>{label}</MenuItem>;
  });
  return (
    <div className={`${className} w-full flex justify-center items-center`}>
      <span className='text-xs mr-2'>{label}</span>
      <MuiSelect
        className='h-10 text-sm flex-1'
        value={computedValue}
        onChange={handleChange}
      >
        { OptionsChild }
      </MuiSelect>
    </div>
  );
}