import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';
import { getFolder } from '@api/application';
import { useEffect, useState } from 'react';
import { ApplicationData, PageData } from '@/types';
import FolderIcon from '@/components/Svg/FolderIcon';

interface MoveDialogProp {
  open: boolean
  parent: string
  onClose: () => void
  onSubmit: (target: string) => void
}
type AppDataType = (PageData | ApplicationData)[]

export default function MoveDialog(props: MoveDialogProp) {
  const { onClose, onSubmit, open, parent } = props;
  const [appList, setAppList] = useState<ApplicationData[]>([]);
  function formatData(data: AppDataType) {
    const appData: ApplicationData[] = [];
    data.forEach(item => {
      if (item.type === 1) {
        appData.push(item as ApplicationData);
      }
    });
    setAppList(appData);
  }
  const handleClose = () => {
    onClose();
  };
  const handleClick = (uuid: string) => () => {
    onSubmit(uuid);
  };
  useEffect(() => {
    getFolder('').then(({ data }) => {
      formatData(data as AppDataType);
    });
  }, []);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className='dark:border-zinc-600 border-zinc-300 text-base p-2 pt-4 pb-2 border-b border-0 border-solid'>选择目标应用</DialogTitle>
      <DialogContent className='max-h-80 pl-0 pr-0 pb-0'>
        <List className='min-w-60'>
          {appList.map(app => {
            return (
              <ListItem
                key={app.uuid}
                secondaryAction={
                  parent === app.uuid ? <Check/> : ''
                }
                disablePadding
              >
                <ListItemButton onClick={handleClick(app.uuid)} dense>
                  <ListItemIcon className='w-12 mr-0 pr-0 min-w-12'>
                    <FolderIcon size={30} className='align-middle dark:text-amber-400 text-amber-400' />
                  </ListItemIcon>
                  <ListItemText primary={app.title} className='text-zinc-900 dark:text-zinc-200' />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
}