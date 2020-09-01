import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/Dashboard/Sidebar';
import Timeline from '../../components/Dashboard/Timeline';
import Content from '../../components/Dashboard/Content';
import { useParams } from 'react-router-dom';

import fetchData from './fetchData'

const useStyles = makeStyles((theme) => ({
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
}));

export default function Dashboard() {
  	const classes = useStyles();
    let { dashboardId } = useParams();
    const [sessionIdDadosAbertos, setSessionIdDadosAbertos] = React.useState(null);
  

    async function fetchSessionData(){
      try {
        const data = await fetchData(dashboardId);
        //setSessionIdDadosAbertos(data)
        //this.setState({sessionsList:data})
        //this.setState({dataLoaded:true});
      } catch (error) {
          throw error;
      }
    };

    useEffect(() => {
      // Atualiza o titulo do documento usando a API do browser
      fetchSessionData();
    });


		return (
			<Grid container className={classes.body}>
				<Grid item md={1} className={classes.sidebar}>
					<Sidebar></Sidebar>
				</Grid>
				<Grid item md={4} className={classes.timeline}>
          <Timeline sessionID={dashboardId} sessionDadosAbertosId={sessionIdDadosAbertos}></Timeline>
				</Grid>
				<Grid item md={7} className={classes.content}>
          <Content sessionID={dashboardId} sessionDadosAbertosId={sessionIdDadosAbertos}></Content>
				</Grid>
			</Grid>
		)
}
