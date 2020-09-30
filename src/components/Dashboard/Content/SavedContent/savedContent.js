
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';


import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import fetchDataSavedContentCamara from './fetchDataSavedContent'

import NewsCard from './../AgenciaCamara/newsCard'
import TVCard from './../TVCamara/tvCamaraCard'
import RadioCard from './../RadioCamara/radioCard'


function topBarSavedContent(props){
  return(
    <React.Fragment>
      <Grid item xs={10}>
        <Typography variant="h6" style={{ color: "#007E5A" }}>Mais recentes </Typography>
      </Grid>

      <Grid item xs={2}>
        <TextField
          id="input-search-agencia"
          size="small"
          InputProps={{
            endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default class SavedContent extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        savedContent: [], 
        dataLoaded: false
    };
  }

  fetchSessionsList = async term => {
    //try {
      const data = await fetchDataSavedContentCamara(this.props.sessionId);

      this.setState({savedContent:data})
      this.setState({dataLoaded:true});
      //console.log(this.state.savedContent)

    //} catch (error) {
    //    throw error;
    //}
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchSessionsList();
      }
  }

  handleCardRenderType(info){
    switch(info.content_type) {
      case 'news':
        return <NewsCard info={info} sessionId={this.props.sessionId}></NewsCard>
      case 'tv':
        return <TVCard info={info} sessionId={this.props.sessionId}></TVCard>;
      case 'radio':
        return <RadioCard info={info} sessionId={this.props.sessionId}></RadioCard>;
      default:
        return null;
    }
  }

  render(){

    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    if(this.state.savedContent.length < 1){
      return (
        <Box width={1} height={1}>
          <Box display="flex" justifyContent="center" alignItems="center" width={"100%"} height={"100%"}>
            <Typography variant="h5" style={{color: "#C4C4C4"}}>Conteúdos salvos</Typography>
          </Box>
        </Box>
      )
    }

    return (
      <div>
        <Grid container>
          {topBarSavedContent()}  
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <List style={{maxHeight: '200px', overflow: 'auto'}}>            
                {this.state.savedContent.map((card) => (
                    <li key={`section-${card.id}`}>
                        <Box my={0.5}>{this.handleCardRenderType(card)}</Box>
                    </li>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}