import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/Dashboard/Sidebar';
import Timeline from '../../components/Dashboard/Timeline';
import Content from '../../components/Dashboard/Content';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import { flexbox } from '@material-ui/system';

import { fetchData, changeBroadcastingStatus } from './APIHandler';
import { withRouter } from "react-router";

const useStyles = theme => ({
  body: {
    backgroundColor: "#F2F2F2",
    border: 0,
    width: '100%',
    minHeight:'100vh',
    position: 'relative',
    display: 'flex',
    fontFamily: 'Open sans',
  },
  timeline: {
  	backgroundColor: "#FFF",
  },
  sidebar: {
  	backgroundColor: "#00AF82"
  },
  content: {
  	backgroundColor: "#F2F2F2",
  }
});

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dashboardId: this.props.match.params.dashboardId,
      sessionInfo: '',
      dataLoaded: false,
      broadcastingOnline: false,
    };
  }


  fetchSessionInfo = async term => {
    try{
      const response = await fetchData(this.props.match.params.dashboardId);
      this.setState({sessionInfo:response.data});
      this.setState({dataLoaded:true});
      this.setState({broadcastingOnline: response.data.enable});
      //console.log("Session info", this.state.sessionInfo)
    }catch(e){
      console.log("erro ao obter informações da sessão")
    }
  };

  componentDidMount(){
      this._isMounted = true;
      //console.log(this.props.match.params.dashboardId);

      if(this._isMounted){
          this.fetchSessionInfo();
      }
  }

  setBroadcastingStatus = async (broadcastingStatus) => {
    try {
      let dashboardInfo = this.state.sessionInfo;
      const response = await changeBroadcastingStatus(dashboardInfo, broadcastingStatus);
      this.setState({broadcastingOnline: response.data.enable});
    } catch(e) {
      console.log("não foi possível inicializar ou finalizar a transmissão");
    }
  }

  render(){
    const classes = useStyles();
    //console.log("dashboard",this.state.sessionInfo )
    
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
      <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box width={"10%"} bgcolor="grey.300" className={classes.sidebar} flexShrink={1} display="flex" flex-direction= "column" >

                      <Sidebar></Sidebar>

            </Box>
            <Box flexGrow={1} bgcolor="grey.300">
                      <Grid container className={classes.body}>
       
                        <Grid item md={4} style={{	backgroundColor: "#FFF"}}>
                          <Timeline sessionID={this.state.dashboardId}
                                    broadcastingOnline={this.state.broadcastingOnline}
                                    setBroadcastingStatus={this.setBroadcastingStatus}
                                    sessionInfo={this.state.sessionInfo}></Timeline>
                        </Grid>
                        <Grid item md={8} style={{backgroundColor: "#F2F2F2"}}>
                          <Content sessionID={this.state.dashboardId} sessionInfo={this.state.sessionInfo}></Content>
                        </Grid>
                      </Grid>
            </Box>

          </Box>
        </div>


      </div>
		)
  }
}


//export default withRouter(withStyles(useStyles2)(Dashboard));
export default withStyles(useStyles)(withRouter(Dashboard));
