import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AgenciaCamaraContent from './AgenciaCamara/agenciaCamara'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '1rem',
    height: '100%',
    overflow: 'auto',
  },
  menu: {
    padding: '0.1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0.1rem 0',
    width: '100%',
    height: '100% !important',
    color: 'white',
    '&:focus, &.Mui-focusVisible': {
      backgroundColor: '#007E5A',
      color: "white",
    },
  },
  content: {
    padding: '1rem',
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#007E5A',
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
  },
  tabIndicator: {
    backgroundColor: '#007E5A',
  },
}));

const MenuButton = withStyles((theme) => ({
  root: {
    color: "#666666",
    backgroundColor: "#F9F9F9",
    textTransform: 'none',
    '&:focus': {
      backgroundColor: '#007E5A',
      color: "white",
    },
  },
}))(Button);



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
        <Box p={3}>
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

export default function ExternalContentPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.body}>
      <Grid item md={3} className={classes.menu}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            variant="fullWidth"
            className={classes.tabs}
            classes={{
              indicator: classes.tabIndicator
            }}
          >
          
            <Tab label="Conteúdos Salvos" {...a11yProps(0)} />
            <Tab label="Agência Câmara" {...a11yProps(1)} />
            <Tab label="TV Câmara" {...a11yProps(2)} />
            <Tab label="Rádio Câmara" {...a11yProps(3)} />
            <Tab label="Twitter" {...a11yProps(4)} />
            <Tab label="Glossário" {...a11yProps(5)} />
          </Tabs>
      </Grid>
      <Grid item md={9} className={classes.content}>
        <Grid container>
            <Grid item xs={12}>Search</Grid>
            <Grid item xs={12}>
              <TabPanel value={value} index={0}>
              <AgenciaCamaraContent></AgenciaCamaraContent>
        
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Six
              </TabPanel>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
