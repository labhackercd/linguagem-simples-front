import React from 'react';

import { Grid, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import fetchPlenaryAttendance from './fetchPlenaryAttendance'
import DescriptionErrorAlert from '../../../../Alert/index'

import AttendanceListAlphabetic from './attendanceListAlphabetic'
import AttendanceListByState from './attendaceListByState'

export default class PlenaryAttendance extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        votingList: null, 
        dataLoaded: false,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos,
        selectOptions:[{title:"A-Z",value:0},{title:"Estado",value:1}],
        selectedOption:0,
        plenaryAttendanceList:null,
        serverError: false
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  

  fetchAttendanceList = async term => {
    var responseData = null
      if(this.state.sessionIdDadosAbertos !== undefined){
        try{
          responseData = await fetchPlenaryAttendance(this.state.sessionIdDadosAbertos);
          console.log(responseData)
          this.setState({plenaryAttendanceList:responseData});
          //console.log(this.state.plenaryAttendanceList)
          this.setState({dataLoaded:true});
        }catch(e){
          this.setState({serverError:true});
          this.setState({dataLoaded:true});
        }
      }
  };

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchAttendanceList();
      }
  }
  
  handleSelectChange(event) {
    //event.preventDefault();
    this.setState({selectedOption:event.target.value})
    this.forceUpdate()
  }

  render(){
    const defaultProps = {
      bgcolor: 'background.paper',
      borderColor: '#F2F2F2',
      border: 3,
    };

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
        <Box paddingTop={1} width={"43vh"} mr={2} ml={0.5}>
          <Grid container xs={12}>
            <Grid item xs={9} >
                <Box borderRadius={5} {...defaultProps}>
                  <Box margin={1} fontWeight="fontWeightBold">
                    <Typography style={{ color: "#666666" }} variant="h5"  display="inline">TOTAL DE PRESENTES: </Typography>
                    <Typography style={{ color: "#00AF82" }} variant="h5"  display="inline">{this.state.plenaryAttendanceList.length}</Typography>
                  </Box>
                </Box>
            </Grid>
            <Grid item xs={3} >
              <Box display="flex" justifyContent="center" paddingTop={1} paddingLeft={2} >
                <FormControl >
                    <NativeSelect
                      autoWidth
                      value={this.state.selectedOption}
                      onChange={this.handleSelectChange}
                      inputProps={{
                        name: 'attendanceType',
                        id: 'attendance-type-item-slect',
                      }}
                    >
                    {this.state.selectOptions.map((item) => (
                        <option id={"selectAttendanceOption"+item.value} key={item.value} value={item.value}>{item.title}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width={'97%'} style={{maxHeight: "21vh"}} paddingTop={2}  mr={2} ml={0.5} >
                  {(parseInt(this.state.selectedOption) === 0)
                    ?  <AttendanceListAlphabetic plenaryAttendanceList={this.state.plenaryAttendanceList}></AttendanceListAlphabetic>
                    : <AttendanceListByState plenaryAttendanceList={this.state.plenaryAttendanceList}></AttendanceListByState>
                  }        
              </Box>
            </Grid>
          </Grid>
        </Box>


    )
  }
}