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
        orientationSelectedVotingListItem:mockOrientation
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  fetchVotingPauta = async term => {
    var responseData = null
      if(this.state.sessionIdDadosAbertos !== undefined){
        responseData = await fetchVotingList(this.state.sessionIdDadosAbertos);

        this.setState({votingList:responseData})
        console.log(this.state.votingList)
        this.setState({dataLoaded:true});
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
  }


  render(){

    if(!this.state.dataLoaded){
    return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container>
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
                <option key={0} value={null}>Selecionar</option>
                {this.state.votingList.map((item) => (
                    <option key={item.ideItemVotacao} value={item.ideItemVotacao}>{item.titulo}</option>
                ))}
              </NativeSelect>
            </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {this.state.selectedVotingListItem !== null && 
              <Grid container>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#F4F4F4'}}>
                    <Typography display="inline" width={"50%"}>Left</Typography>
                    <Typography display="inline" width={"50%"} align="right">Right</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#FFFFFF'}}>2</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#FFFFFF'}}>3</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#F4F4F4'}}>4</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#F4F4F4'}}>5</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} style={{background:'#FFFFFF'}}>6</Paper>
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}