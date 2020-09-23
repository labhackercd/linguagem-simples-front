import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import LaunchIcon from '@material-ui/icons/Launch';
import Divider from '@material-ui/core/Divider';
import CongressPersonLine from './congressPersonLine'



export default class AttendanceListAlphabetic extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        plenaryAttendanceList: props.plenaryAttendanceList,
        dataLoaded: false,
    };
  }



  renderListItem = ({index, style}) => {

    return(
      <ListItem  style={style} >   
        <CongressPersonLine data={this.state.plenaryAttendanceList[index]}></CongressPersonLine>
      </ListItem>
    )
  }

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          //this.fetchSessionsList();
      }
  }


  render(){
    //console.log(this.state.news)

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Box style={{overflow: "auto"}}>
              <FixedSizeList height={180} itemSize={25} itemCount={this.state.plenaryAttendanceList.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}