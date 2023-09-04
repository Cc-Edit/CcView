import { Dialog, DialogTitle } from '@mui/material';
import FormFactory from '@/components/Form/FormFactory';
import { CreateUser, UpdateUser } from '@/config/form/CreateUser';
import { EventParams } from '@/types';
interface CreateUserDialogProp {
  open: boolean
  isUpdate?: boolean
  defaultVal?: Record<string, any>
  defaultValue?: Record<string, any>
  onClose: () => void
  onSubmit: (data: Record<string, any>, refs: Record<string, any>) => void
}
export default function CreateDialog(props: CreateUserDialogProp) {
  const { onClose, onSubmit, open, isUpdate, defaultVal } = props;
  const handleClose = () => {
    onClose();
  };
  // 表单内的事件统一处理
  function onEvent(eventParams: EventParams) {
    const { type, data, refs } = eventParams;
    // 提交事件
    if (type === 'submit') {
      onSubmit(data, refs);
    }
    if (type === 'cancel') {
      onClose();
    }
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className='border-left pl-4 ml-5'>{isUpdate ? '更新用户信息' : '创建用户'}</DialogTitle>
      <div className='w-140 p-4'>
        <FormFactory
          defaultVal={defaultVal}
          isUpdate={isUpdate}
          config={isUpdate ? UpdateUser : CreateUser}
          onEvent={onEvent} />
      </div>
    </Dialog>
  );
}