import React from 'react';
import {Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';

import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
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
      //console.log(this.state.plenaryAttendanceList)
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
              <FixedSizeList height={215} itemSize={25} itemCount={this.state.plenaryAttendanceList.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}