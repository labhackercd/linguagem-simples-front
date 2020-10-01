import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import fetchTVCamara from './fetchTvCamara'
import TVCard from './tvCamaraCard'
import DescriptionErrorAlert from '../../../Alert/index'


export default class TvCamaraContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        tvNews: "", 
        tvNewsFiltered: "", 
        dataLoaded: false,
        searchField:'',
        serverError: false
    };
  }

  topBarTVCamara(props){
    return(
      <React.Fragment>
        <Grid item xs={10}>
          <Box width={1} height={1} display="flex" alignItems="flex-end">
            <Typography variant="h6" style={{ color: "#007E5A" }}>Mais recentes </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="input-search-tv"
            size="small"
            onChange={this.tvFilterOnChange}
            InputProps={{
              endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}
          />
        </Grid>
      </React.Fragment>
    );
  }

  fetchTvNewsList = async term => {
    try{
      const data = await fetchTVCamara();
      this.setState({tvNews:data.hits.hits})
      this.setState({tvNewsFiltered:data.hits.hits})
      this.setState({dataLoaded:true});
    }catch(e){
      this.setState({serverError:true});
      this.setState({dataLoaded:true});
    }  
  };


  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchTvNewsList();
      }
  }

  tvFilterOnChange = (event) => {
    //console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    //console.log(this.state.searchField)
    this.setState({
      tvNewsFiltered: this.state.tvNews.filter(news => news._source.titulo.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
    //console.log(this.state.tvNewsFiltered)
  }

  render(){
    //console.log(this.state.news)
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress></CircularProgress>
              </Box>)
    }

    if(this.state.serverError){
      return (<Box display="flex" justifyContent="center" alignItems="center">
                  <DescriptionErrorAlert></DescriptionErrorAlert>
              </Box>)
    }

    return (
      <div>
        <Grid container>
          {this.topBarTVCamara()}
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <List style={{maxHeight: '232px', overflow: 'auto'}}>         
                {this.state.tvNewsFiltered.map((newsItem) => (
                  <li key={`section-${newsItem._id}`}>
                      <Box my={0.5}><TVCard info={newsItem._source} sessionId={this.props.sessionId} ></TVCard></Box>
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