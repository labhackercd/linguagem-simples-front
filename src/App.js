import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import OpenSansSemiBold from './fonts/OpenSans-SemiBold.ttf';

import AppRouter from './router'

const openSansSemiBold = {
  fontFamily: 'OpenSans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  src: `
    local('OpenSans'),
    local('OpenSans-SemiBold'),
    url(${OpenSansSemiBold}) format('ttf')
  `,
}

const theme = createMuiTheme({
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
      fontSize:15,
      fontStyle: 'semibold',
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

function App() {
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
            <AppRouter theme={theme}></AppRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
