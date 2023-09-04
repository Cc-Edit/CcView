import { Dialog, DialogTitle } from '@mui/material';
import FormFactory from '@/components/Form/FormFactory';
import CreateApp from '@/config/form/CreateApp';
import CreatePage from '@/config/form/CreatePage';
import { EventParams } from '@/types';
interface CreateDialogProp {
  open: boolean
  isUpdate?: boolean
  defaultVal?: Record<string, any>
  type: string
  defaultValue?: Record<string, any>
  onClose: () => void
  onSubmit: (data: Record<string, any>, refs: Record<string, any>) => void
}
export default function CreateDialog(props: CreateDialogProp) {
  const { onClose, onSubmit, type, open, isUpdate, defaultVal } = props;
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
      <DialogTitle className='border-left pl-4 ml-5'>{isUpdate ? '更新' : '创建'}{ type === 'page' ? '页面' : '应用' }</DialogTitle>
      <div className='w-140 p-4'>
        <FormFactory
          key={type}
          defaultVal={defaultVal}
          isUpdate={isUpdate}
          config={type === 'page' ? CreatePage : CreateApp}
          onEvent={onEvent} />
      </div>
    </Dialog>
  );
}