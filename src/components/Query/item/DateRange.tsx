import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
interface DateRangeProps {
  [key: string]: any,
  onChange: Function
}
export default function DateRange(props: DateRangeProps) {
  const { eventMap, className = '', defaultValue, value = {}, label = '', onChange, options = [], ...prop } = props;
  const { start, end } = value;
  const [startTime, setStartTime] = useState<Dayjs | null>(start ? dayjs(start) : dayjs(dayjs('2023-01-01 00:00:00')));
  const [endTime, setEndTime] = useState<Dayjs | null>(end ? dayjs(end) : dayjs());

  useEffect(() => {
    const start = startTime?.unix();
    const end = endTime?.unix();
    if (start && end) {
      onChange?.({
        start: (start * 1000),
        end: (end * 1000) + (1000 * 60 * 60 * 24 - 1) // 事件计算到最后一毫秒
      });
    }
  }, [startTime, endTime]);

  return (
    <div className={`${className} datarage w-full flex justify-start flex-nowrap items-center`}>
      <span className='text-xs mr-2'>{label}</span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
          <div className='w-92 flex flex-nowrap flex-row h-10 '>
          <DatePicker {...prop} className='w-20 min-w-40' value={startTime} onChange={newValue => setStartTime(newValue)} />
          <span className='h-10 text-xs flex items-center px-2'>至</span>
          <DatePicker {...prop} className='w-20 min-w-40' value={endTime} onChange={newValue => setEndTime(newValue)} />
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}