import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {videoSnippetsMockData} from './videoSnippetsMockData'
import fetchSessionVideos from './fetchVideoSnippetsCamara'
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase'

import VideoSnippetModal from './VideoSnippetModal/videoSnippetModal'
import SnippetCard from './videoSnippetCard'



export default class VideoSnippets extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        snippets: '',
        filteredSnippets: '',
        sessionHasStarted: false,
        dataLoaded: false,
        searchField: '',
        error:{
          happened:false,
          message: "Erro",
          status:""
        }
    };
  }

  componentDidMount(){
      this._isMounted = true;
      //console.log(this.props)
      if(this._isMounted){

          if(this.props.sessionInfo.situation_session === "pre_session"){
            this.setState({sessionHasStarted:false});
            //this.setState({snippets:true});
          }else{
            this.setState({sessionHasStarted:true})
            this.fetchSessionsList();
          }
          
      }
  }

  fetchSessionsList = async term => {
    try {
      //console.log(this.props)
      const data = await fetchSessionVideos(this.props.sessionInfo.id_session_dados_abertos);
      this.setState({snippets:data})
      this.setState({filteredSnippets:data})
      this.setState({dataLoaded:true});
    } catch (error) {
      //console.log(error)
      this.setState({error:{happened:true,status:error.response.status} })
    }
  };

  renderSearchBarFunction(){
    return(
      <React.Fragment>
        <Grid container>
          <Grid item xs={10}>
            <Box marginLeft={2} marginTop={1}>
              <Typography variant="h5" style={{ color: "#3E3E3E" }}>Trechos</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box marginRight={1}> 
              <TextField
                id="input-search-snippet"
                size="small"
                onChange={this.snippetsFilterOnChange}
                InputProps={{
                  endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                }}/>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  renderListItem = ({index, style}) => {
    return(
      <ListItem disableGutters={true} style={style} >
          <SnippetCard data = {this.state.filteredSnippets[index]}></SnippetCard>        
      </ListItem>
    )
  }

  snippetsFilterOnChange = (event) => {
    //console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    
    this.setState({
      filteredSnippets: this.state.snippets.filter(term => term.author.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
    
  }

  render(){
    const widthSnippetsBox = parseInt(((window.innerWidth)*0.54));
    const widthSnippetsItem = (((window.innerWidth)*0.5)*0.12);
    //console.log(widthSnippetsBox)
   
    if(this.state.error.happened){
      return (<Box display="flex" justifyContent="center" alignItems="center" width={"100%"}>
                  <Typography>Erro</Typography>
              </Box>)
    }

    if(!this.state.sessionHasStarted){
      return (<Box display="flex" justifyContent="center" alignItems="center" width={"100%"}>
                  <Typography>A transmissão ainda não foi iniciada.</Typography>
              </Box>)
    }

    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center" width={"100%"}><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container >
        {this.renderSearchBarFunction()}
          <Grid item xs={12}>
            <Box marginLeft={1}>
              <FixedSizeList width={widthSnippetsBox} height={"12.5vh"} itemSize={widthSnippetsItem} layout="horizontal" itemCount={this.state.filteredSnippets.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}