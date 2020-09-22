import React from 'react';

import { Grid, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {fetchVotingList,fetchOrientationVote} from './fetchPlenaryVoting'
import Paper from '@material-ui/core/Paper'
import VoteOrientationCard from './voteOrientationCard'

export default class PlenaryVoting extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        votingList: null, 
        dataLoaded: false,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos,
        selectedVotingListItem:null,
        orientationSelectedVotingListItem:null,
        orientationSelectedVotingListDataLoaded:null,
        colorCounter:1
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
        try{
          responseData = await fetchOrientationVote(id);
          this.setState({orientationSelectedVotingListItem:responseData})
          this.setState({orientationSelectedVotingListDataLoaded:true})
        }catch(e){
          console.log("erro")
        }
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
                {this.state.orientationSelectedVotingListDataLoaded === true && 
                  <Grid container>
                      {this.state.orientationSelectedVotingListItem.map((item) => (
                          <VoteOrientationCard key={item.numOrdemOrientacao} info={item}></VoteOrientationCard>
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