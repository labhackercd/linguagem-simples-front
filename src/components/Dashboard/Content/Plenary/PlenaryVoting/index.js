import React from 'react';

import { Grid, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import fetchVotingList from './fetchVotingList.js'
import fetchOrientationVote from './fetchOrientationVote'
import mockOrientation from './datamock'
import Paper from '@material-ui/core/Paper'

export default class PlenaryVoting extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        votingList:[0,1,2,3], 
        dataLoaded: false,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos,
        selectedVotingListItem:null,
        orientationSelectedVotingListItem:mockOrientation,
        colorCounter:1
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }
  

  fetchVotingPauta = async term => {
    var responseData = null
      if(this.state.sessionIdDadosAbertos !== undefined){
        responseData = await fetchVotingList(this.state.sessionIdDadosAbertos);
        this.setState({votingList:responseData})
        this.setState({dataLoaded:true});
      }else{
        //Nothing to do
      }
  };

  async fetchOrientationVote(id){
    var responseData = null
      if(this.state.selectedVotingListItem !== undefined){
        responseData = await fetchOrientationVote(id);
        this.setState({orientationSelectedVotingListItem:responseData})
      }else{
        //Nothing to do
      }
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchVotingPauta();
      }
  }
  
  handleSelectChange(event) {
    event.preventDefault();

    this.setState({selectedVotingListItem:event.target.value})
    this.fetchOrientationVote(event.target.value);
  }

  renderOption(key, info){
    const mod = parseInt(key) % 4;
    var color = null;
    var voteColor = null;

    if(mod === 1 || mod === 0){
      color = "#F4F4F4";
    }else{
      color = "#FFFFFF";
    }

    switch(info.codOrientacaoVotacao){
      case "S":
        voteColor = "green";
        break;
      case "N":
        voteColor = "red";
        break;
      default:
        voteColor = "#2F80ED"
        break;
    }

    return (  
      <Grid item xs={6}>
        <Box width="96%">        
          <Paper elevation={0} style={{background:color}} >
            <Grid container>
              <Grid item xs={6}>
              <Typography style={{ color: "#666666" }} variant="body1">{info.nomRepresentacaoPartidaria}</Typography>
              </Grid>
              <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography style={{ color: voteColor }} variant="body1">{info.nomOrientacaoVotacaoResumido}</Typography>
                  </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    )

  }

  render(){
    
    if(!this.state.dataLoaded){
    return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Box paddingTop={1} margin={1}>
            <FormControl variant="outlined">
                <NativeSelect
                  value={this.state.selectedVotingListItem}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    name: 'votation',
                    id: 'votation-list-item-slect',
                  }}
                >
               
                {this.state.votingList.map((item) => (
                    <option key={item.ideItemVotacao} value={item.ideItemVotacao}>{item.titulo}</option>
                ))}
              </NativeSelect>
            </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width={'99%'} style={{maxHeight: '200px', overflow: 'auto'}}>
                {this.state.selectedVotingListItem !== null && 
                  <Grid container>
                      {this.state.orientationSelectedVotingListItem.map((item) => (
                          this.renderOption(item.numOrdemOrientacao,item)
                      ))}
                  </Grid>
                }
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}