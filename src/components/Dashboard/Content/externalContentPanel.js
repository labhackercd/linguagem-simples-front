import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { display } from '@material-ui/system';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SvgIcon from '@material-ui/core/SvgIcon';


import { ReactComponent as AgenciaCamaraIcon } from  './icons/agenciaCamaraIcon.svg';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import RadioOutlinedIcon from '@material-ui/icons/RadioOutlined';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ReactComponent as GlossarioIcon } from './icons/glossarioIcon.svg';
import RadioCamaraIcon from './icons/radioCamaraIcon.svg';

import SavedContent from './SavedContent/savedContent';
import AgenciaCamaraContent from './AgenciaCamara/agenciaCamara';
import RadioCamaraContent from './RadioCamara/radioCamara';
import TvCamaraContent from './TVCamara/tvCamara';
import GlossarioContent from './Glossario/glossario';

import TwitterDeputadosContent from './TwitterDeputados/twitterDeputados';

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '1rem',
    height: 'auto',
    overflow: 'auto',
  },
  menu: {
    padding: '0.1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tab:{
    paddingTop:'0px',
    [theme.breakpoints.up(500)]: {
        minWidth: '100%',
        paddingLeft: '2px',
        paddingRight: '5px',
    }
  },
  paper:{
    paddingTop:'0px',
    [theme.breakpoints.up(500)]: {
        minWidth: '100%',
        paddingLeft: '2px',
        paddingRight: '5px',
    }
  },
  bigIndicator: {
      height: 0,
      width:0
  },
  default_tabStyle: {
      backgroundColor: "#F2F2F2",
      color:"666666",
      textTransform: "none",
      minWidth: '100%',
  },
  active_tabStyle: {
      backgroundColor: "#007E5A",
      borderRadius: 5,
      color:"white",
      textTransform: "none",
      minWidth: '100%',
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


export default function ExternalContentPanel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function TabLabel(props){
    return (
      <React.Fragment>
          <Paper elevation={0} classes={{ root: classes.paper}} className={ value === props.tabValue ? classes.active_tabStyle : classes.default_tabStyle}>
            <Box  pt={0.5} pb={0.5}  pl={1}>
              <Grid container alignItems="center">
                <Grid item xs={2}><Box paddingTop={0.7}>{props.tabIcon}</Box></Grid>
                <Grid item xs={6}><Box display="flex" flexDirection="row"><Typography variant="h6">{props.tabText}</Typography></Box></Grid>
              </Grid>
            </Box>
          </Paper>
      </React.Fragment>
    )
  }

  return (
    <Grid container className={classes.body} spacing={2}>
      <Grid item md={3} className={classes.menu}>
        <Tabs
          orientation="vertical" variant="standard"
          classes={{ root: classes.tab, selected: classes.tabSelected, labelContainer: classes.labelContainer,indicator: classes.bigIndicator  }}
          value={value} onChange={handleChange}>
          <Tab  key={0} id="savedContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={0} tabText={"Conteúdos Salvos"} tabIcon={<BookmarkBorderIcon/>}/>}/>
          <Tab  key={1} id="agenciaCamaraContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={1} tabText={"Agência Câmara"} tabIcon={<DescriptionOutlinedIcon/>}/>}/>
          <Tab  key={2} id="tvCamaraContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={2} tabText={"TV Câmara"} tabIcon={<LiveTvOutlinedIcon/>}/>}/>
          <Tab  key={3} id="radioCamaraContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={3} tabText={"Rádio Câmara"} tabIcon={<RadioOutlinedIcon/>}/>}/>
          <Tab  key={4} id="twitterContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={4} tabText={"Twitter"} tabIcon={<TwitterIcon/>}/>}/>
          <Tab  key={5} id="glossarioContentTab" classes={{ root: classes.tab}}
                label={<TabLabel tabValue={5} tabText={"Glossário"} tabIcon={<TwitterIcon/>}/>}/>
        </Tabs>
      </Grid>
      <Grid item md={9}>
        <TabPanel value={value} index={0}><SavedContent sessionId={props.sessionId}></SavedContent></TabPanel>
        <TabPanel value={value} index={1} style={{paddingTop:0}}><AgenciaCamaraContent sessionId={props.sessionId}></AgenciaCamaraContent></TabPanel>
        <TabPanel value={value} index={2}><TvCamaraContent sessionId={props.sessionId}></TvCamaraContent></TabPanel>
        <TabPanel value={value} index={3}><RadioCamaraContent sessionId={props.sessionId}></RadioCamaraContent></TabPanel>
        <TabPanel value={value} index={4}><TwitterDeputadosContent></TwitterDeputadosContent></TabPanel>
        <TabPanel value={value} index={5}><GlossarioContent></GlossarioContent></TabPanel>     
      </Grid>
    </Grid>
  )
}
