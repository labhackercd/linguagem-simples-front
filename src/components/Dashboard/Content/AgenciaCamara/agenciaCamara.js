import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import NewsCard from './newsCard'
import fetchDataAgenciaCamara from './fetchDataAgenciaCamara'
import DescriptionErrorAlert from '../../../Alert/index'

export default class AgenciaCamaraContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        agenciaNews: "", 
        agenciaNewsFiltered: "",
        dataLoaded: false,
        searchField:'',
        serverError: false
    };
  }

  topBarAgenciaCamara(props){
    return(
      <React.Fragment>
        <Grid item xs={10}>
          <Box width={1} height={1} display="flex" alignItems="flex-end">
            <Typography variant="h6" style={{ color: "#007E5A" }}>Mais recentes </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="input-search-agencia"
            size="small"
            onChange={this.agenciaFilterOnChange}
            InputProps={{
              endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}
          />
        </Grid>
      </React.Fragment>
    );
  }

  fetchNewsList = async term => {
    try{
      const data = await fetchDataAgenciaCamara();
      this.setState({agenciaNews:data.hits.hits})
      this.setState({agenciaNewsFiltered:data.hits.hits})
      this.setState({dataLoaded:true});
    }catch(e){
      this.setState({serverError:true});
      this.setState({dataLoaded:true});
    }  
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchNewsList();
      }
  }

  agenciaFilterOnChange = (event) => {
    //console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    this.setState({
      agenciaNewsFiltered: this.state.agenciaNews.filter(news => news._source.titulo.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
  }

  render(){
    //console.log(this.state.news)
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    if(this.state.serverError){
      return (<Box display="flex" justifyContent="center" alignItems="center">
                  <DescriptionErrorAlert></DescriptionErrorAlert>
              </Box>)
    }

    return (
      <div>
        <Grid container>
          {this.topBarAgenciaCamara()}
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <List style={{maxHeight: '232px', overflow: 'auto'}}>            
                {this.state.agenciaNewsFiltered.map((newsItem) => (
                    <li key={`section-${newsItem._id}`}>
                        <Box my={0.5}><NewsCard info={newsItem._source} sessionId={this.props.sessionId}></NewsCard></Box>
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