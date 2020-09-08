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

import AgendaCard from './agendaCard'
//import {fetchDataAgenciaCamara} from './fetchDataAgenciaCamara'
import fetchAgendaOfTheDay from './fetchAgendaOfTheDay'


export default class AgendaOfTheDayComponent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        pautas: [{_id:1},{_id:2},{_id:3},{_id:4},{_id:5}], 
        dataLoaded: false,
    };
  }

  fetchAgenda = async term => {
   try {
      const data = await fetchAgendaOfTheDay(this.props.sessionIdDadosAbertos);
      // TODO O erro está sendo esperar o Id da sessão dos dados abertos, que as vezes já está carregado e outras vezes não
      // colocar um ternário nas funções superiores e modificar de component função para classe com state.c
      //this.setState({sessionsList:data})
      this.setState({dataLoaded:true});

    } catch (error) {
        throw error;
        
    }
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchAgenda();
      }
  }

  render(){
    //console.log(this.state.news)
    if(!this.state.dataLoaded){
    return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress>oi {this.props.sessionIdDadosAbertos}</Box>)
    }

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>

              <List style={{maxHeight: '260px', maxWidth:'98%', overflow: 'auto'}}>            
                {this.state.pautas.map((pauta) => (
                    <li key={`section-${pauta._id}`}>
                        <Box my={0.5}><AgendaCard sessionIdDadosAbertos={this.props.sessionIdDadosAbertos}></AgendaCard></Box>
                    </li>
                ))}
              </List>
     
          </Grid>
        </Grid>
      </div>
    )
  }
}