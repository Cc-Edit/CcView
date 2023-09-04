import {
  Avatar,
  Tooltip,
  Button,
  InputLabel,
  IconButton
} from '@mui/material';
import { forwardRef, ChangeEvent, useState, useEffect } from 'react';
import { FormItemTempProp } from '@/types';
import { uploadFiles } from '@api/oss';
import { useSnackbar } from 'notistack';
import { Domain } from '@/config/constant';
const defaultHead = ['/avatar/b1.png', '/avatar/b2.png', '/avatar/b3.png', '/avatar/g1.png', '/avatar/g2.png', '/avatar/g3.png'];
// 头像
const AvatarItem = forwardRef((props: FormItemTempProp, ref) => {
  const { config: { properties }, field, fieldState } = props;
  const [cover, setCover] = useState(field.value);
  const { enqueueSnackbar } = useSnackbar();

  function handleFIleUpload(event: ChangeEvent<HTMLInputElement>) {
    const inputTarget = event.target;
    const { files } = inputTarget;
    if (files && files.length > 0) {
      const file = files[0];
      uploadFiles([file])
        .then(res => {
          if (res?.isOk) {
            const { data } = res;
            const [imageId] = data as string[];
            const imageUrl = `${Domain.baseURL}/${imageId}.${file.type.replace('image/', '')}`;
            setCover(imageUrl);
          } else {
            enqueueSnackbar(`头像上传失败：${res?.msg}`, {
              variant: 'error'
            });
          }
        })
        .catch(e => {
          enqueueSnackbar(`头像上传失败: 上传异常`, {
            variant: 'error'
          });
        });
    }
  }
  const defaultAvatar = defaultHead.map((item, index) => {
    return <IconButton key={index} onClick={() => setCover(item)} className={`${item === cover ? 'border ' : ''} w-8 h-8 border-solid border-amber-500 mr-1`} sx={{ p: 0 }}>
      <Avatar className='w-6 h-6 ' src={item} />
    </IconButton>;
  });
  useEffect(() => {
    if (!cover) {
      setCover(defaultHead[0]);
    }
  }, []);
  useEffect(() => {
    field.onChange(cover);
  }, [cover]);
  return (
    <div className='flex flex-col px-4 flex-nowrap justify-center items-start'>
      <div className='w-full flex-1 flex flex-row items-center justify-center'>
        <Tooltip title='点击上传本地图片' placement='top'>
          <Button component='label' className='rounded-full relative w-22 h-22 border border-solid border-amber-500' sx={{ p: 0 }} >
            <input hidden accept='.png, .jpg, .jpeg' type='file' onChange={handleFIleUpload} />
            <Avatar className='w-20 h-20' src={cover} />
          </Button>
        </Tooltip>
      </div>
      <div className='flex w-full flex-col justify-start items-center mt-2'>
        <div className='flex flex-row items-center'>
          {defaultAvatar}
        </div>
      </div>
    </div>
  );
});
AvatarItem.displayName = 'AvatarItem';
export default AvatarItem;