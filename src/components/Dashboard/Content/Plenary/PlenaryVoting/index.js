import React from 'react';

import { Grid, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper'

import {fetchVotingList,fetchOrientationVote} from './fetchPlenaryVoting'
import DescriptionErrorAlert from '../../../../Alert/index'
import VoteOrientationCard from './voteOrientationCard'

export default class PlenaryVoting extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        votingList: null, 
        dataLoaded: false,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos,
        selectedVotingListItem:"",
        orientationSelectedVotingListItem:"",
        orientationSelectedVotingListDataLoaded:false,
        serverError: false
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  

  fetchVotingPauta = async term => {
    var responseData = null
      if(this.state.sessionIdDadosAbertos !== undefined){
        try{
          responseData = await fetchVotingList(this.state.sessionIdDadosAbertos);
          //console.log(responseData)
          this.setState({votingList:responseData});
          this.setState({dataLoaded:true});
        }catch(e){
          this.setState({serverError:true});
          this.setState({dataLoaded:true});
        }
      }
  };

  async fetchOrientationVote(id){
    var responseData = null
      if(this.state.selectedVotingListItem !== undefined){
        try{
          responseData = await fetchOrientationVote(id);
          this.setState({orientationSelectedVotingListItem:responseData})
          this.setState({orientationSelectedVotingListDataLoaded:true});
        }catch(e){
          this.setState({serverError:true});
          this.setState({dataLoaded:true});
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
      return (        
        <Box display="flex" justifyContent="center" alignItems="center" minWidth="40vh" minHeight="10vh" width={1}>
          <CircularProgress></CircularProgress>
        </Box>
      )
    }

    if(this.state.serverError){
      return (<Box display="flex" justifyContent="center" alignItems="center" width="95%" paddingTop={1}><DescriptionErrorAlert></DescriptionErrorAlert></Box>)
    }

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Box margin={1}>
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
                      <option id={"selectOption"+item.ideItemVotacao} key={item.ideItemVotacao} value={item.ideItemVotacao}>{item.titulo}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mx={1} width={'95%'} style={{maxHeight: "23vh", overflow: 'auto'}}>
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