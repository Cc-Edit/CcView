import WarningIcon from '@/components/Svg/WarningIcon';

export default function HelperText({ message }: { message: string }) {
  if (message) {
    return (
      <>
        <WarningIcon className='inline-block mr-1 align-middle' color={'#dc2626'} size={16}></WarningIcon>
        {message}
      </>
    );
  }
  return null;
}