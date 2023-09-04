import { Edit, Ballot, Person, Home, Source, Settings, Storefront, LocalGroceryStore } from '@mui/icons-material';

type IconGenProp = {
  className?: string,
  icon: string
}

export default function IconGen({ icon, className }: IconGenProp) {
  switch (icon) {
    case 'Edit':
      return <Edit className={className} fontSize='small'/>;
    case 'Home':
      return <Home className={className} fontSize='small'/>;
    case 'Source':
      return <Source className={className} fontSize='small'/>;
    case 'Storefront':
      return <Storefront className={className} fontSize='small'/>;
    case 'Person':
      return <Person className={className} fontSize='small'/>;
    case 'Ballot':
      return <Ballot className={className} fontSize='small'/>;
    case 'LocalGroceryStore':
      return <LocalGroceryStore className={className} fontSize='small'/>;
    case 'Settings':
      return <Settings className={className} fontSize='small'/>;
    default:
      return <Settings className={className} fontSize='small'/>;
  }
}