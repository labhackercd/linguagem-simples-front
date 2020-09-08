import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import {lista_twitter} from './twitterData'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import LaunchIcon from '@material-ui/icons/Launch';


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
      },
      rootAccordion: {
        width: '100%',
      },
}));


function TwitterCard(props){
  const classes = useStyles();

  return (
      <Box width="97%" marginTop={0.5}>
          <Paper elevation={0} className={classes.newsCard}>
              <Grid container>
                  <Grid item xs={12}>
                  <a rel={'external noopener noreferrer'} target="_blank" href={"https://"+props.data.twitter} style={{textDecoration: "none"}}>
                      <Box m={1}>
                          <Grid container>
                              <Grid item xs={11}>
                                  <Typography style={{ color: "gray" }}>{props.data.nome} ({props.data.partido}-{props.data.uf})</Typography>
                              </Grid>
                              <Grid item xs={1}>                        
                                  <IconButton aria-label="Ir para Twitter" size="small">
                                      <LaunchIcon  fontSize="inherit" />
                                  </IconButton>     
                              </Grid>
                          </Grid>
                      </Box>
                      </a>
                  </Grid>
              </Grid>
          </Paper>
      </Box>
  );
}


export default class TwitterDeputadosContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        twitters: lista_twitter,
        filterTwitters: lista_twitter,
        dataLoaded: false,
        searchField: ''
    };
  }

  renderSearchBarFunction(){
    return(
      <React.Fragment>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ color: "#007E5A" }}>Mais recentes </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="input-search-agencia"
            size="small"
            onChange={this.twittersFilterOnChange}
            InputProps={{
              endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}
          />
        </Grid>
      </React.Fragment>
    )
  }


  fetchSessionsList = async term => {
    try {
      //const data = await fetchDataAgenciaCamara();
      //this.setState({sessionsList:data})
      this.setState({dataLoaded:true});

    } catch (error) {
        throw error;
    }
  };

  renderListItem = ({index, style}) => {
    return(
      <ListItem  style={style} >   
        <TwitterCard data={this.state.filterTwitters[index]}></TwitterCard>
      </ListItem>
    )
  }

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchSessionsList();
      }
  }


  twittersFilterOnChange = (event) => {
    console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    this.setState({
      filterTwitters: this.state.twitters.filter(twitter => twitter.nome.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
  }

  render(){
    //console.log(this.state.news)
      

    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container>
          {this.renderSearchBarFunction()}
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <FixedSizeList height={250} itemSize={44} itemCount={this.state.filterTwitters.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}