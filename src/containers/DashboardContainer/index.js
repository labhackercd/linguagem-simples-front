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

import fetchData from './fetchData'
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
      dataLoaded: false
    };
  }


  fetchSessionInfo = async term => {
    try{
      const response = await fetchData(this.props.match.params.dashboardId);
      this.setState({sessionInfo:response.data});
      this.setState({dataLoaded:true});
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


  render(){
    const classes = useStyles();

    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
			<Grid container className={classes.body}>
				<Grid item md={1} className={classes.sidebar}>
					<Sidebar></Sidebar>
				</Grid>
				<Grid item md={4} style={{	backgroundColor: "#FFF"}}>
          <Timeline sessionID={this.state.dashboardId} sessionInfo={this.state.sessionInfo}></Timeline>
				</Grid>
				<Grid item md={7} style={{backgroundColor: "#F2F2F2"}}>
          <Content sessionID={this.state.dashboardId} sessionInfo={this.state.sessionInfo}></Content>
				</Grid>
			</Grid>
		)
  }
}


//export default withRouter(withStyles(useStyles2)(Dashboard));
export default withStyles(useStyles)(withRouter(Dashboard));
