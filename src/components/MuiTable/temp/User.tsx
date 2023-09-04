import { Avatar } from '@mui/material';
import { MailOutline, LocalPhone } from '@mui/icons-material';
export default function User(data: Record<string, any>) {
  const { eventMap, email, name, phone, avatar = '/avatar/b1.png' } = data;
  return (
    <div className='flex flex-row items-center'>
      <Avatar className='border border-solid border-amber-600 w-10 h-10' src={avatar} />
      <div className='flex-1 flex flex-col ml-2'>
        <span className='text-sm ml-1 block text-left'>{name}</span>
        <div className='flex flex-row justify-start items-center'>
          <div className='flex flex-row justify-start items-center mr-4'><LocalPhone className='w-4 h-4 mr-1' /><span>{phone}</span></div>
          <div className='flex flex-row justify-start items-center'><MailOutline className='w-4 h-4 mr-1' /><span>{email}</span></div>
        </div>
      </div>
    </div>
  );
}
