import React from 'react';

import { Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import {fetchVotingList, fetchNominalVote, fetchOrientationVote} from './fetchPlenaryVoting'
import DescriptionErrorAlert from '../../../../Alert/index'
import VoteOrientationCard from './voteOrientationCard'
import VoteNominalCard from './voteNominalCard'

import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';

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
        nominalSelectedVotingListItem:"",
        nominalSelectedVotingListDataLoaded:false,
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

  async fetchNominalVote(id){
    var responseData = null
      if(id !== undefined){
        try{
          responseData = await fetchNominalVote(id);
          // Se data não for nula
            this.setState({orientationSelectedVotingListItem:responseData})
            this.setState({orientationSelectedVotingListDataLoaded:true});
            // return true;
          // Se a data for nula
            // return false;
        }catch(e){
          this.setState({serverError:true});
          this.setState({dataLoaded:true});
        }
      }
    }

  async fetchOrientationVote(id){
    var responseData = null
      if(this.state.selectedVotingListItem !== undefined){
        try{
          responseData = await fetchOrientationVote(id);
          this.setState({nominalSelectedVotingListItem:responseData})
          this.setState({nominalSelectedVotingListDataLoaded:true});
        }catch(e){
          this.setState({serverError:true});
          this.setState({dataLoaded:true});
        }
      }
  };

  async fetchCorrespondentVotation(id){
    var selectedVotingItemIsNominal = await fetchNominalVote(id);

    if(selectedVotingItemIsNominal === false){
      //Select a orientation vote
      await fetchOrientationVote(id);
    }else{
      //Não foi possível obter os dados da votação
    }
  }

  

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchVotingPauta();
      }
  }
  
  handleSelectChange(event) {
    event.preventDefault();

    this.setState({selectedVotingListItem:event.target.value})

    // Primeiro fetch nominal vote
    // Se retornar nulo obtem votação orientação, se não segue em freten
    this.fetchOrientationVote(event.target.value);
  }


  renderNominalVotingListItem = ({index, style}) => {
    return(
      <ListItem style={style} >   
        <VoteNominalCard data={this.state.orientationSelectedVotingListItem[index]}></VoteNominalCard>
      </ListItem>
    )
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
                    placeholder="Selecione"
                    value={this.state.selectedVotingListItem}
                    onChange={this.handleSelectChange}
                    inputProps={{
                      name: 'votation',
                      id: 'votation-list-item-slect',
                    }}
                  >
                  <option aria-label="None" key={0} value=""> Selecionar resultado</option>
                  {this.state.votingList.map((item) => (
                      <option id={"selectOption"+item.ideItemVotacao} key={item.ideItemVotacao} value={item.ideItemVotacao}>{item.titulo}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
            {this.state.orientationSelectedVotingListDataLoaded === true && 
              <Grid item xs={12}>
                <Box mx={1} width={'95%'} style={{maxHeight: "23vh", overflow: 'auto'}}>    
                  <Grid container>
                      {this.state.orientationSelectedVotingListItem.map((item) => (
                          <VoteOrientationCard key={item.numOrdemOrientacao} info={item}></VoteOrientationCard>
                      ))}
                  </Grid>   
                </Box>
              </Grid>
            }
            { this.state.nominalSelectedVotingListDataLoaded === true &&
              <Grid item xs={12}>
                <Box style={{overflow: "auto"}}>
                  {
                    <FixedSizeList height={215} itemSize={25} itemCount={this.state.orientationSelectedVotingListItem.length}>        
                      {this.renderNominalVotingListItem}
                    </FixedSizeList>
                  }
                </Box>
              </Grid> 
            }
        </Grid>
      </div>
    )
  }
}