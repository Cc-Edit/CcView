import Image from 'next/image';
import { QrCodeScanner, MailOutline } from '@mui/icons-material';
import { Popover } from '@mui/material';
import { useState, MouseEvent } from 'react';
interface TipBoxProps {
  className?: string
}
export default function TipBox({ className }: TipBoxProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const tipImage = '/3d/3d-business-little-boy-in-online-lesson.png';
  const codeImage = '/wechat.png';
  const open = Boolean(anchorEl);
  return (
    <div className={`${className} relative`}>
      <div className='z-10 absolute top-0 right-3 w-56 h-56'>
        <Image
          alt=''
          src={tipImage}
          fill
          sizes='100vw'
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
      <div className='dark:text-zinc-50 text-zinc-600 z-0 h-2/3 p-4 absolute bottom-2 left-4 right-4 bg-gradient-to-br from-amber-200 dark:from-amber-600 via-amber-400 dark:via-amber-500 to-amber-200 dark:to-amber-600 rounded-xl border border-solid border-zinc-300 dark:border-zinc-400'>
        <h3 className='mt-4 mb-2'>如何获取帮助？</h3>
        <ul className='absolute bottom-0 left-0'>
          <li className='mb-2'>如果您需要联系购买</li>
          <li className='mb-2'>当您在使用过程中遇到困难</li>
          <li className='mb-2'>我们的Email: <i className='dark:text-zinc-100 text-zinc-700'><MailOutline className='w-5 ml-3 cursor-pointer align-top mr-1' />ccedit@126.com</i></li>
          <li className='mb-2'>也可以加入我们的客户服务群 <b onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} ><QrCodeScanner className='w-5 ml-3 cursor-pointer align-top'/></b></li>
        </ul>
        <Popover
          sx={{
            pointerEvents: 'none'
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div className='z-10 w-40 h-40'>
            <Image
              alt=''
              src={codeImage}
              fill
              sizes='100vw'
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
}