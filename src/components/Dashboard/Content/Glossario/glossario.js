import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {lista_glossario} from './glossarioData'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import GlossarioTermCard from './glossarioTermCard'



export default class GlossarioContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        glossario: lista_glossario,
        filteredGlossario: lista_glossario,
        dataLoaded: false,
        searchField: ''
    };
  }

  renderSearchBarFunction(){
    return(
      <React.Fragment>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ color: "#007E5A" }}>A - Z </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="input-search-glossario"
            size="small"
            onChange={this.glossarioFilterOnChange}
            InputProps={{
              endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}/>
        </Grid>
      </React.Fragment>
    )
  }


  fetchGlossaryList = async term => {
    //try {
      this.setState({dataLoaded:true});

    /*} catch (error) {
        throw error;
    }*/
  };

  renderListItem = ({index, style}) => {
    return(
      <ListItem  style={style} >   
        <GlossarioTermCard data={this.state.filteredGlossario[index]}></GlossarioTermCard>
      </ListItem>
    )
  }

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchGlossaryList();
      }
  }


  glossarioFilterOnChange = (event) => {
    this.setState({
      searchField: event.target.value
    })
    this.setState({
      filteredGlossario: this.state.glossario.filter(term => term.termo.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
  }

  render(){
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container>
          {this.renderSearchBarFunction()}
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <FixedSizeList height={250} itemSize={40} itemCount={this.state.filteredGlossario.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}