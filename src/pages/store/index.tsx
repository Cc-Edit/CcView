import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { CastConnected, DesktopMac, DeveloperBoard, PhoneIphone, ListAlt, Widgets } from '@mui/icons-material';
import { deleteTemplate, getTemplateList, createTemplatePage } from '@api/template';
import TemplateItem from './TemplateItem';
import EmptyContainer from '@/components/Design/components/EmptyContainer';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function Store() {
  const confirm = useConfirm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('bc');
  const [templateList, setTemplateList] = useState<Record<string, any>[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    getTemplateList(0).then(({ data }) => {
      setTemplateList(data as Record<string, any>[]);
    });
  }, []);

  function handleEvent(type:string, templateData: Record<string, any>) {
    switch (type) {
      case 'preview':
        window.open(`${document.location.origin}/template/${templateData.uuid}`, '_blank');
        break;
      case 'delete':
        confirm({ title: '❗️  警告', description: `删除之后不可恢复，确认要删除模板吗？`, confirmationText: '确认', cancellationText: '取消' })
          .then(() => {
            deleteTemplate(templateData.uuid).then(({ isOk, msg }) => {
              if (isOk) {
                enqueueSnackbar(`删除成功`, {
                  variant: 'success'
                });
                getTemplateList(0).then(({ data }) => {
                  setTemplateList(data as Record<string, any>[]);
                });
              } else {
                enqueueSnackbar(`删除失败：${msg}`, {
                  variant: 'warning'
                });
              }
            })
              .catch(error => {
                enqueueSnackbar(`删除失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
                  variant: 'error'
                });
              });
          })
          .catch(() => {});
        break;
      case 'create':
        confirm({ title: '提醒', description: `基于当前模板创建新的页面？`, confirmationText: '确认', cancellationText: '取消' })
          .then(() => {
            createTemplatePage(templateData.uuid).then(({ isOk, data, msg }) => {
              if (isOk) {
                const { uuid } = data;
                enqueueSnackbar(`创建成功~`, {
                  variant: 'success'
                });
                router.push(`/design/${uuid}`);
              } else {
                enqueueSnackbar(`创建失败：${msg}`, {
                  variant: 'warning'
                });
              }
            })
              .catch(error => {
                enqueueSnackbar(`创建失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
                  variant: 'error'
                });
              });
          })
          .catch(() => {});
        break;
      default:
        break;
    }
  }

  const child = templateList.length === 0 ? <EmptyContainer className='mt-20' text='还没有添加模板~' /> : templateList.map((item, index) => {
    return (
      <div key={index} className='sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5 p-1'>
        <div className='w-full h-full'>
          <TemplateItem data={item} onEvent={handleEvent} />
        </div>
      </div>
    );
  });
  return (
    <div className='relative mt-10'>
      <div className='mb-5 sticky top-0 z-30 dark:bg-neutral-900 bg-neutral-50'>
         <Tabs
           className='rounded-lg '
           value={value}
           onChange={handleChange}
         >
           <Tab className='h-10 mr-3 rounded-xl' icon={<CastConnected />} iconPosition='start' value='bc' label='大屏模板' />
           <Tab className='h-10 mr-3' icon={<DesktopMac />} iconPosition='start' value='web' label='网页模板' />
           <Tab className='h-10 mr-3' icon={<DeveloperBoard />} iconPosition='start' value='miniprogram' label='小程序模板' />
           <Tab className='h-10 mr-3' icon={<PhoneIphone />} iconPosition='start' value='phone' label='移动端模板' />
           <Tab className='h-10 mr-3' icon={<ListAlt />} iconPosition='start' value='form' label='表单模板' />
           <Tab className='h-10 mr-3' icon={<Widgets />} iconPosition='start' value='app' label='应用模板' />
         </Tabs>
      </div>
      <div className='flex flex-row flex-wrap ml-2 mr-1'>
        { child }
      </div>
    </div>
  );
}
