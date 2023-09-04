import { Button } from '@mui/material';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import PersonAdd from '@mui/icons-material/PersonAdd';
interface ResetProps {
  [key: string]: any,
  onChange: Function
}
const iconMap: Record<string, any> = {
  DeleteSweep,
  PersonAdd
};
export default function Reset(props: ResetProps) {
  const { eventName = '', eventMap = {}, is, className = '', defaultValue, value, label = '', onChange, options = [], startIcon, ...prop } = props;
  function handleClick() {
    eventMap[eventName]?.();
  }
  const StartIconEle = iconMap[startIcon];
  const startIconChild = StartIconEle ? <StartIconEle /> : null;
  return (
    <div className={`${className} w-full flex justify-start items-center`}>
      <Button className='text-xs h-10' startIcon={startIconChild} onClick={handleClick} {...prop}>
        { label }
      </Button>
    </div>
  );
}