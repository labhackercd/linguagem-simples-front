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
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import LaunchIcon from '@material-ui/icons/Launch';
import TwitterCard from './twitterCard'


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
    //Let structure here to future if necessary to connect twitter api instead of mock
    //try {
      //const data = await fetchDataAgenciaCamara();
      //this.setState({sessionsList:data})
      this.setState({dataLoaded:true});
    /*
    } catch (error) {
        throw error;
    }*/
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
    //console.log(event.target.value)
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