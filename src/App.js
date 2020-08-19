import React from 'react';
import './App.css';
import {ThemeProvider } from '@material-ui/core/styles';
import AppRouter from './router'
import {customTheme} from './theme'
/*import { StylesProvider } from '@material-ui/core/styles';*/
/*const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;*/

function App() {
  return (
    <div className="App">
      {/*<StylesProvider generateClassName={generateClassName}>*/}
       <ThemeProvider theme={customTheme}>
            <AppRouter theme={customTheme}></AppRouter>
      </ThemeProvider>
      {/*</StylesProvider>*/}
    </div>
  );
}

export default App;
