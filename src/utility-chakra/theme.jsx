import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  smmd: '450px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

const theme = extendTheme({
  shadows: {
    purple: '0 0 0 3px rgba(159, 122, 234, 0.6)',
  },
  colors: {
    color: {
      background: '#141d2f',
      backgroundLight: '#1e2a47',
      shadowBgLight: '0 16px 30px -10px rgba(70,96,187,0)',
      whiteText: '#fff',
      buttonBlue: '#0079ff',
      buttonBlueHover: '#90a4d4',
    },
  },
  fonts: {
    heading: 'Space Mono',
    body: 'Space Mono',
  },
  breakpoints,
});

export default theme;
