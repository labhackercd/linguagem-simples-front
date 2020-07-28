import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import OpenSansSemiBold from './fonts/OpenSans-SemiBold.ttf'
import EstudioAcompanhePageContainer from './containers/EstudioAcompanhePageContainer'

const openSansSemiBold = {
  fontFamily: 'OpenSans',
  fontStyle: 'normal',
  src: `
    local('OpenSans'),
    local('OpenSans-SemiBold'),
    url(${OpenSansSemiBold}) format('ttf')
  `,
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'OpenSans',
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
      fontSize:12,
      fontStyle: 'semibold',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [openSansSemiBold],
      },
    },
  },
});



function App() {
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <div> Hello world </div>
              </Route>
              <Route exact path="/estudio">
                <EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>
              </Route>
            </Switch>
          </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
