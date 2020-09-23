import React from 'react';

import { Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';

import AgendaCard from './agendaCard'
import fetchAgendaOfTheDay from './fetchAgendaOfTheDay'


export default class AgendaOfTheDayComponent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        pautas: null, 
        dataLoaded: false,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos
    };
  }

  fetchAgenda = async term => {
    var data = null
      if(this.state.sessionIdDadosAbertos !== undefined){
        data = await fetchAgendaOfTheDay(this.state.sessionIdDadosAbertos);
        this.setState({pautas:data.dados})
        this.setState({dataLoaded:true});
      }else{
        //Nothing to do
      }
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchAgenda();
      }
  }

  render(){

    if(!this.state.dataLoaded){
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minWidth="40vh" minHeight="10vh" width={1}>
          <CircularProgress></CircularProgress>
        </Box>
      )

    }

    return (
      <Box width={'99%'} height={"85%"} style={{ overflow: 'auto'}}>
        <Grid container>
          <Grid item xs={12}>
              <List style={{maxHeight: '260px', maxWidth:'98%', overflow: 'auto'}}>            
                {this.state.pautas.map((pauta) => (
                    <li key={`section-${pauta.proposicao_.id}`}>
                        <Box my={0.5}><AgendaCard pautaInfo={pauta} sessionIdDadosAbertos={this.state.sessionIdDadosAbertos}></AgendaCard></Box>
                    </li>
                ))}
              </List>
          </Grid>
        </Grid>
      </Box>
    )
  }
}
