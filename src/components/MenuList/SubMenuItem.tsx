import { MenuType } from '@/types';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';

interface SubMenuItemProp {
  data: MenuType
  expandMap: Record<string, any>
  activeKey: string
  onMenuClick: Function
}

export default function SubMenuItem({ expandMap, activeKey, data, onMenuClick }: SubMenuItemProp) {
 return <Collapse in={expandMap[data.key]} timeout='auto' unmountOnExit>
   <List component='div' disablePadding>
     {
       data.child?.map(subMenu => (
         <ListItemButton key={subMenu.key} className={activeKey === subMenu.key ? 'active-sub' : ''}
                         onClick={() => {
                           onMenuClick(subMenu);
                         }}>
           <ListItemText>{subMenu.title}</ListItemText>
         </ListItemButton>
       ))
     }
   </List>
 </Collapse>;
}