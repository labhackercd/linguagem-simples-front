import { createMuiTheme } from '@material-ui/core/styles';
import OpenSansSemiBold from './fonts/OpenSans-SemiBold.ttf';


const openSansSemiBold = {
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    src: `
      local('OpenSans'),
      local('OpenSans-SemiBold'),
      url(${OpenSansSemiBold}) format('ttf')
    `,
  };
  
  export const customTheme = createMuiTheme({
    typography: {
      fontFamily: "OpenSans",
      body:{
        fontSize:12,
        fontStyle: 'semibold',
      },
      h1:{
        fontSize:54,
        fontStyle: 'semibold',
      },
      h2:{
        fontSize:36,
        fontStyle: 'semibold',
      },
      h3:{
        fontSize:24,
        fontStyle: 'semibold',
      },
      h4:{
        fontSize:16,
        fontStyle: 'semibold',
      },
      h5:{
        fontSize:14,
        fontStyle: 'semibold',
      },
      h6:{
        fontSize:16,
        fontStyle: 'semibold',
      },
      h7:{
        fontSize:9,
        fontStyle: 'regular',
      },
      body1:{
        fontSize:12,
        fontStyle: 'regular'
      },
      body2:{
        fontSize:9,
        fontStyle: 'semibold',
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [openSansSemiBold],
        },
      },
    },
    palette: {
      primary: {
        main: '#007E5A',
      },
      cinza1: {
        main: '#F2F2F2',
      },
      cinza2: {
        main: '#C4C4C4',
      },
      grey: {
        main: '#666666',
      },
      amareloCamara: {
        main: '#FAC915',
      },
    },
  
  });