import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {newsMockData} from './radioMockData'
import moment from 'moment';
import {fetchDataRadioCamara} from './fetchRadioCamara'
import PlayIcon from './assets/play_image.svg'


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
    root2: {
        background:'#007E5A',
        border: 0,
        height: '100%',
        width: '100%',
        position: "fixed",
        display: "flex"
      },
      sessionList:{
        overflow: 'auto',
        maxHeight: 350,
        maxWidth: '100%'
      },
      input:{
          color: "green"
      },
      newsCard:{
        background:'#F4F4F4',
      }
}));

function RadioCard(props){
    const classes = useStyles();

    return (
      <Box width="97%" height="100%" >
          <Paper elevation={0} className={classes.newsCard}>
              <Grid container>
                  <Grid item xs={12}>
                      <Box my={1} mr={1}>
                        <Grid container  alignItems="center" justify="center">
                          <Grid item xs={2} align="center" alignItems="center">                         
                            <img src={PlayIcon} alt="Ícone de play audio"></img>  
                          </Grid>
                          <Grid item xs={10}>
                            <Grid container>
                              <Grid item xs={11}>
                                <Typography style={{ color: "gray" }} variant="body1">Áudio</Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddCircleOutlineIcon fontSize="inherit" />
                                    <BookmarkIcon fontSize="inherit"  style={{ color: "#00AF82" }} /> 
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontWeight="fontWeightRegular">
                                    <Typography variant="h6" style={{ color: "#007E5A" }}>
                                      {props.info.titulo}                   
                                    </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontSize={11}>
                                  <Typography style={{ color: "gray" }}>
                                      {moment(new Date(props.info.data)).format("DD/MM/YYYY HH:mm")}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                  </Grid>
              </Grid>
          </Paper>
      </Box>
  );
}

export default class RadioCamaraContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        news: newsMockData.hits.hits, 
        dataLoaded: false
    };
  }

  fetchSessionsList = async term => {
    try {
      //const data = await fetchDataRadioCamara();
      //this.setState({sessionsList:data})
      this.setState({dataLoaded:true});

    } catch (error) {
        throw error;
    }
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchSessionsList();
      }
  }

  render(){
    //console.log(this.state.news)
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress></CircularProgress>
              </Box>)
    }

    return (
      <div>
          <List style={{maxHeight: '200px', overflow: 'auto'}}>        
              {this.state.news.map((sectionId) => (
                  <li key={`section-${sectionId._id}`}>
                      <Box my={0.5}><RadioCard info={sectionId._source} ></RadioCard></Box>
                  </li>
              ))}
          </List>
      </div>
    )
  }
}