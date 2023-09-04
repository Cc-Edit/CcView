import { createContext } from 'react';

const ThemeModeContext = createContext({ toggleColorMode: (mode: 'light'|'dark') => {} });

export default ThemeModeContext;