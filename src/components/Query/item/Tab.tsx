import { useEffect, SyntheticEvent } from 'react';
import { Tabs, Tab as MuiTab } from '@mui/material';
interface TabProps {
  [key: string]: any,
  onChange: Function
}
export default function Tab(props: TabProps) {
  const { eventMap, className, defaultValue, value, onChange, options = [] } = props;
  function handleChange(event: SyntheticEvent, newValue: string) {
    onChange?.(newValue);
  }
  const computedValue = value ?? defaultValue;
  useEffect(() => {
    if (computedValue !== value) {
      onChange?.(computedValue);
    }
  }, []);
  const OptionsChild = (options as Record<string, any>[]).map(option => {
    return <MuiTab className='px-4' key={option.value} {...option} />;
  });
  return (
    <div className={`${className}`}>
      <Tabs value={computedValue} onChange={handleChange} >
        { OptionsChild }
      </Tabs>
    </div>
  );
}