import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AgendaOfTheDayComponent from './AgendaOfTheDay/index'
import PlenaryVoting from './PlenaryVoting/index'


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    backgroundColor: '#007E5A',
    display: 'flex',
   
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
  },
  tabIndicator: {
    backgroundColor: '#007E5A',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box ml={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function PlenaryPanel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log(props)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(props.sessionIdDadosAbertos === undefined || props.sessionIdDadosAbertos === null){
      return <div> Dados abertos não sincronizados </div>
  }else{
    return (
        <Grid container className={classes.body}>
            <Grid item xs={12}>
                <Tabs
                    orientation="horizontal"
                    value={value}
                    variant="fullWidth"
                    onChange={handleChange}
                    className={classes.tabs}
                    classes={{
                    indicator: classes.tabIndicator
                    }}
                >
                    <Tab label="Pauta do Dia" {...a11yProps(0)} />
                    <Tab label="Presença" {...a11yProps(1)} />
                    <Tab label="Votação" {...a11yProps(2)} />
                </Tabs>
            </Grid>
                <TabPanel value={value} index={0}>
                    <AgendaOfTheDayComponent sessionIdDadosAbertos={props.sessionIdDadosAbertos}></AgendaOfTheDayComponent>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    oi 2
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PlenaryVoting sessionIdDadosAbertos={props.sessionIdDadosAbertos}></PlenaryVoting>
                </TabPanel>
        </Grid>
      )
  }


}
