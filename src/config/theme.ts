import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
export default function getTheme(mode: PaletteMode) {
  const isDark = mode !== 'light';
 return createTheme({
   spacing: 6,
   typography: {
     // In Chinese and Japanese the characters are usually larger,
     // so a smaller fontsize may be appropriate.
     fontSize: 14
   },
   components: {
     MuiTableRow: {
       styleOverrides: {
         root: {
           '&.MuiTableRow-hover:hover': {
             backgroundColor: isDark ? 'rgba(38,38,38,0.5)' : 'rgba(212,212,216,0.4)'
           },
           '&:nth-of-type(odd)': {
             backgroundColor: isDark ? 'rgba(38,38,38,0.8)' : 'rgba(212,212,216,0.4)'
           }
         }
       }
     },
     MuiTableCell: {
       styleOverrides: {
         root: {
           padding: '10px'
         },
         head: {
           backgroundColor: isDark ? '#262626' : '#d4d4d8',
           color: isDark ? '#fafafa' : '#262626'
         },
         body: {
           fontSize: 14
         }
       }
     },
     MuiInputBase: {
       styleOverrides: {
         input: {
           fontSize: '14px',
           padding: '13px 12px',
           lineHeight: '18px',
           height: '18px',
           verticalAlign: 'middle'
         }
       }
     },
     MuiOutlinedInput: {
       styleOverrides: {
         notchedOutline: {
           // borderColor: 'rgba(234, 179, 8, 0.5)'
         },
         input: {
           fontSize: '14px',
           padding: '13px 12px',
           lineHeight: '18px',
           height: '18px',
           verticalAlign: 'middle'
         }
       }
     },
     MuiInputLabel: {
       styleOverrides: {
         root: {
           fontSize: '14px',
           lineHeight: '18px',
           height: '18px',
           marginTop: '-3px'
           // transform: 'translate(14px, -6px) scale(0.9)'
         }
       }
     }
   },
   palette: {
     mode,
     common: {
       black: '#171717',
       white: '#d4d4d8'
     },
     primary: {
       main: '#eab308',
       dark: '#ca8a04',
       light: '#facc15'
     },
     error: {
       main: '#dc2626',
       dark: '#b91c1c',
       light: '#ef4444'
     },
     warning: {
       main: '#f97316',
       dark: '#ea580c',
       light: '#fb923c'
     },
     action: {
       active: '#facc15',
       hover: 'rgba(250, 204, 21, 0.9)',
       focus: 'rgba(250, 204, 21, 0.12)',
       disabled: 'rgba(250, 204, 21, 0.3)',
       selected: 'rgba(250, 204, 21, 0.16)'
     }
   }
 });
}
