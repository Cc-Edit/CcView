import { ApplicationData, PageData, MoreMenuEvent } from '@/types';
import { ExpandMore, AddCircleOutline } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ApplicationItem from '@/components/Application/ApplicationItem';
import PageItem from '@/components/Application/PageItem';
import EmptyIcon from '@/components/Svg/Empty';
import { MouseEvent, useState } from 'react';
import { useSnackbar } from 'notistack';
import CreateDialog from '@/components/Dialog/CreateDialog';
import MoveDialog from '@/components/Dialog/MoveDialog';
import { delay } from '@/utils/common';
import { copyAppOrPage, creatApp, creatPage, deleteAppOrPage, movePage, updateApp, updatePage } from '@api/application';
import { useConfirm } from 'material-ui-confirm';
import { ApplicationCreate, PageCreate } from '@/types/form';
import { savaPageTemplate } from '@api/template';
interface AppContainerProp {
  className?: string
  title: string
  parent?: string
  type: string
  emptyText?: string
  data: ApplicationData[] | PageData[]
  onChange: Function
}
export default function AppContainer(props: AppContainerProp) {
  const {
    className,
    type = 'page',
    title,
    parent = 'root',
    emptyText = '还没创建应用~',
    data,
    onChange
  } = props;
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const [selectEle, setSelect] = useState<Record<string, any> | null>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // 创建按钮事件
  function onCreateButtonClick(event: MouseEvent) {
    setOpenDialog(true);
    event.stopPropagation();
  }
  // 创建应用或页面
  function handleCreate(data: Record<string, any>, refs: Record<string, any>) {
    const submitButtonRef = refs['submit-btn'];
    submitButtonRef?.current?.disableButton();
    (type === 'page' ? creatPage(data as PageCreate, parent) : creatApp(data as ApplicationCreate, parent)).then(({ isOk, msg }) => {
      if (isOk) {
        delay(300).then(() => {
          setOpenDialog(false);
          onChange && onChange(data);
        });
      } else {
        enqueueSnackbar(`创建失败：${msg}`, {
          variant: 'warning'
        });
        submitButtonRef?.current?.enableButton();
      }
    }).catch(error => {
      enqueueSnackbar(`创建失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
        variant: 'error'
      });
      submitButtonRef?.current?.enableButton();
    });
  }
  // 更新应用或页面
  function handleUpdate(data: Record<string, any>, refs: Record<string, any>) {
    const submitButtonRef = refs['submit-btn'];
    submitButtonRef?.current?.disableButton();
    (type === 'page' ? updatePage(data as PageCreate) : updateApp(data as ApplicationCreate)).then(({ isOk, msg }) => {
      if (isOk) {
        delay(300).then(() => {
          setOpenUpdateDialog(false);
          onChange && onChange(data);
        });
      } else {
        enqueueSnackbar(`更新失败：${msg}`, {
          variant: 'warning'
        });
        submitButtonRef?.current?.enableButton();
      }
    }).catch(error => {
      enqueueSnackbar(`更新失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
        variant: 'error'
      });
      submitButtonRef?.current?.enableButton();
    });
  }
  // 删除应用或页面
  function handleDelete(uuid: string) {
    deleteAppOrPage(uuid).then(({ isOk, msg }) => {
      if (isOk) {
        enqueueSnackbar(`删除成功`, {
          variant: 'success'
        });
        onChange && onChange(data);
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
  }
  // 发布为模板（后台admin权限校验）
  function handleTemplate(name: string, cover = '', originId: string) {
    savaPageTemplate({ name, cover, originId }).then(({ isOk, msg }) => {
      if (isOk) {
        enqueueSnackbar(`保存模板成功`, {
          variant: 'success'
        });
        onChange && onChange(data);
      } else {
        enqueueSnackbar(`保存模板失败：${msg}`, {
          variant: 'warning'
        });
      }
    })
      .catch(error => {
        enqueueSnackbar(`保存模板失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
      });
  }
  // 复制应用或页面
  function handleCopy(uuid: string) {
    copyAppOrPage(uuid).then(({ isOk, msg }) => {
      if (isOk) {
        enqueueSnackbar(`复制成功`, {
          variant: 'success'
        });
        onChange && onChange(data);
      } else {
        enqueueSnackbar(`复制失败：${msg}`, {
          variant: 'warning'
        });
      }
    })
      .catch(error => {
        enqueueSnackbar(`复制失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
          variant: 'error'
        });
      });
  }
  // 移动页面
  function handleMove(target: string) {
    setOpenMoveDialog(false);
    if (selectEle && target) {
      movePage(selectEle?.uuid, target).then(({ isOk, msg }) => {
        if (isOk) {
          enqueueSnackbar(`移动成功`, {
            variant: 'success'
          });
          onChange && onChange(data);
        } else {
          enqueueSnackbar(`移动失败：${msg}`, {
            variant: 'warning'
          });
        }
      })
        .catch(error => {
          enqueueSnackbar(`移动失败：${Array.isArray(error?.error) ? error?.error.shift() : error.msg}`, {
            variant: 'error'
          });
        });
      onChange && onChange();
    }
  }
  // 更多按钮抛出事件
  function handleMoreEvent(eventData: MoreMenuEvent) {
    const { type: typeNum, eventType, uuid, title, cover } = eventData;
    if (eventType === 'delete') {
      confirm({ title: '❗️  警告', description: `删除之后不可恢复，确认要删除${typeNum === 0 ? `页面 ${title} ` : `应用 ${title} `}吗？`, confirmationText: '确认', cancellationText: '取消' })
        .then(() => {
          handleDelete(uuid);
        })
        .catch(() => {});
    } else if (eventType === 'edit') {
      const element = data.find(item => item.uuid === uuid);
      setSelect({
        ...element
      });
      setOpenUpdateDialog(true);
    } else if (eventType === 'copy') {
      handleCopy(uuid);
    } else if (eventType === 'move') {
      const element = data.find(item => item.uuid === uuid);
      setSelect({
        ...element
      });
      setOpenMoveDialog(true);
    } else if (eventType === 'template') {
      confirm({ title: '提示', description: <span>确认要将此页面保存为模板吗？<br/><span className='text-sm'>注意：保存为模板后如需修改，请再次发布，并删除旧的模板</span></span>, confirmationText: '确认', cancellationText: '取消' })
        .then(() => {
          handleTemplate(title, cover, uuid);
        })
        .catch(() => {});
    }
  }
  const elementList = data.map((item, index) => {
    return type === 'page' ? <PageItem key={index} data={item as PageData} onEvent={handleMoreEvent}/> : <ApplicationItem key={index} data={item} onEvent={handleMoreEvent}/>;
  });
  return (
    <>
      <Accordion className={className} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore/>}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className='flex flex-row content-center items-center'
        >
          <h4 className='min-w-28 leading-8 text-left font-bold m-0 border-left'>{title}</h4>
          <Button className='h-8 ml-10 rounded-2xl' variant='outlined' startIcon={<AddCircleOutline className='transition-all duration-500 hover:rotate-180'/>} onClick={onCreateButtonClick}>
            创建{title}
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex flex-row flex-wrap'>
            {
              elementList.length === 0
                ? <div className='pb-2 min-h-52 w-100 flex-1 flex flex-col flex-wrap justify-center content-center'>
                  <EmptyIcon size={240}/>
                  <b className='text-center text-zinc-500'>{emptyText}</b>
                </div> : elementList
            }
          </div>
        </AccordionDetails>
      </Accordion>
      <CreateDialog type={type} open={openDialog} onClose={() => { setOpenDialog(false); }} onSubmit={handleCreate} />
      <CreateDialog isUpdate={true} defaultVal={selectEle || undefined} type={type} open={openUpdateDialog} onClose={() => { setOpenUpdateDialog(false); }} onSubmit={handleUpdate} />
      {
        type === 'page' && <MoveDialog parent={parent} open={openMoveDialog} onClose={() => { setOpenMoveDialog(false); }} onSubmit={handleMove} />
      }
    </>
  );
}