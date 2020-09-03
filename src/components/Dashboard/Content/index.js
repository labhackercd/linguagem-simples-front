import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExternalContentPanel from './externalContentPanel';
import Youtube from './Youtube/index'
import Button from '@material-ui/core/Button';
import VideoSnippets from './VideoSnippets/videoSnippets'
import {checkIfSessionsAlreadyExistsInSILEG,updateSession} from './fetchSynchronizeData'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '0 1.5rem'
  },
  header: {
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.primary.main
  },
  headerMenu: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  headerMenuItem: {
    padding: '0 1rem 0 1rem',
    alignSelf: 'flex-start'
  },
  column: {
    padding: "1rem",
  },
  firstRow: {
    margin: '0 0 0.5rem 0',
  },
  card: {
    backgroundColor: "white",
    height: 'auto',
    width: 'auto',
    margin: '1rem 0 0 0',
    minHeight: '35vh',
    minWidth: '32vh'
  },
  cardVideo: {
    backgroundColor: "white",
    height: '18vh',
    width: '32vh',
    margin: '1rem 0 0 0',
  },
  secondRow: {
    height: '16vh',
    backgroundColor: "white",
    borderRadius: '5px',
    margin: '0.5rem',
  },
  thirdRow: {
    backgroundColor: "white",
    height:'100%',
    borderRadius: '5px',
    margin: '0.5rem',
  },
  videoWrapper:{
    margin: '1rem 0 0 0',
  }
}));

export default function Content(props) {
  const sessionInfo = props.sessionInfo
  const sessionId = props.sessionID;

  if(sessionInfo!== undefined){
    var sessionIdDadosAbertos = sessionInfo.id_session_dados_abertos;
  }
  

  const classes = useStyles();

  async function handleSynchronize(){
    let sessionsScheduleDadosAbertos = await checkIfSessionsAlreadyExistsInSILEG((moment(sessionInfo.date).format('YYYY-MM-DD')));

    if(sessionsScheduleDadosAbertos.dados[0] ){
      // Session is registered at sileg, so update the information of dashboard
      const dashboardInfoUpdated = await updateSession(sessionId,sessionsScheduleDadosAbertos.dados[0].id)
  
      if(dashboardInfoUpdated){
        window.alert("Session ID atualizado com sucesso :D");
        window.location.reload(false);
      }else{
        window.alert("Falhou :(");
      }
    }
  }
  
  return (
		<Grid container className={classes.body}>
      <Grid container className={classes.header}>
        <Grid item className={classes.headerTitle}>
          <Typography variant="h3" className={classes.title}>Conteúdos</Typography>
        </Grid>
        <Grid item className={classes.headerMenu}>
          {!sessionIdDadosAbertos &&
            <Button onClick={handleSynchronize} className={classes.headerMenuItem}>Sincronizar</Button>
          }
            <Typography variant="h5" className={classes.headerMenuItem}> Ver Acompanhe </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.firstRow} spacing={2}>
          <Grid item md={7}>
            <Typography variant="h5"> Transmissão </Typography>
            <div className={classes.card}>{Youtube(sessionIdDadosAbertos)}</div>   
          </Grid>
          <Grid item md={5}>
            <Typography variant="h5"> Plenário </Typography>
            <Paper elevation={0} className={classes.card}> 
              
            </Paper>
          </Grid>
      </Grid>
      <Grid container className={classes.secondRow}>
        <VideoSnippets></VideoSnippets>
      </Grid>
      <Grid container className={classes.thirdRow}>
        <ExternalContentPanel></ExternalContentPanel>
      </Grid>
		</Grid>
  )
}
