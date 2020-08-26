import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {videoSnippetsMockData} from './videoSnippetsMockData'
import {fetchVideoSnippetsCamara} from './fetchVideoSnippetsCamara'
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase'

import VideoSnippetModal from './VideoSnippetModal/videoSnippetModal'

function SnippetCard(props){
  const deputado = "Rodrigo Maia"
  const siglaPartidaria ="DEM-RJ"

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Box width="100%" height="100%" marginX={0.3} marginTop={0.5}>
      <ButtonBase  onClick={handleClickOpen}>
        <div>
        <img style={{width:"100%", height:"65%"}} id="image" src={props.data.thumbnail} alt="Thumbanail trecho"></img>
        <Box fontSize={10}>
          <Typography>{deputado}</Typography>
        </Box>
        <Box fontSize={8}>
          <Typography variant="body2">Deputado {siglaPartidaria}</Typography>
        </Box>
        </div>
        </ButtonBase>
      <VideoSnippetModal open={open} onClose={handleClose} />

    </Box>
  );
}

export default class VideoSnippets extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        snippets: videoSnippetsMockData,
        filteredSnippets: videoSnippetsMockData,
        dataLoaded: false,
        searchField: ''
    };
  }

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchSessionsList();
      }
  }

  fetchSessionsList = async term => {
    try {
      //const data = await fetchVideoSnippetsCamara();
      //this.setState({sessionsList:data})
      this.setState({dataLoaded:true});

    } catch (error) {
        throw error;
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
          <SnippetCard data = {this.state.snippets[index]}></SnippetCard>        
      </ListItem>
    )
  }

  snippetsFilterOnChange = (event) => {
    console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    this.setState({
      filteredSnippets: this.state.snippets.filter(term => term.description.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
  }

  render(){
    const widthSnippetsBox = ((window.innerWidth)*0.54)
    const widthSnippetsItem = (((window.innerWidth)*0.5)*0.12)

    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container >
        {this.renderSearchBarFunction()}
          <Grid item xs={12}>
            <Box marginLeft={1}>
              <FixedSizeList width={widthSnippetsBox} height={"12vh"} itemSize={widthSnippetsItem} layout="horizontal" itemCount={this.state.filteredSnippets.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}