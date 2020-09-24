import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import ExternalContentPanel from './externalContentPanel';
import Youtube from './Youtube/index'
import Button from '@material-ui/core/Button';
import VideoSnippets from './VideoSnippets/videoSnippets'
import {checkIfSessionsAlreadyExistsInSILEG,updateSession} from './FetchFunctions/fetchSynchronizeData'
import moment from 'moment'
import CustomizedSnackbars from '../../Snackbar/index'
import PlenaryPanel from './Plenary/index'


const useStyles = theme => ({
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
    margin: '0 0 0 0',
  },
  card: {
    backgroundColor: "white",
    height: 'auto',
    width: 'auto',
    margin: '1rem 0 0 0',
    height: '36vh',

  },
  cardVideo: {
    backgroundColor: "white",
    height: '18vh',
    width: '32vh',
    margin: '1rem 0 0 0',
  },
  cardPlenary: {
    backgroundColor: "white",
    height: '18vh',
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
});
  
class Content extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        sessionInfo: this.props.sessionInfo,
        sessionId: this.props.sessionID,
        sessionIdDadosAbertos:this.props.sessionInfo.id_session_dados_abertos===undefined ? null : this.props.sessionInfo.id_session_dados_abertos,
        snackbar:{
          open:false,
          message:"",
          type:""
        }
    };
    this.handleSynchronize=this.handleSynchronize.bind(this);
  }


  async handleSynchronize(){
    let sessionsScheduleDadosAbertos = await checkIfSessionsAlreadyExistsInSILEG((moment(this.state.sessionInfo.date).format('YYYY-MM-DD')));

    if(sessionsScheduleDadosAbertos.dados[0] ){
      // Session is registered at sileg, so update the information of dashboard
      const dashboardInfoUpdated = await updateSession(this.state.sessionId,sessionsScheduleDadosAbertos.dados[0].id)
  
      if(dashboardInfoUpdated){
        this.setState({ snackbar:{open:true, message:"O ID da sessão foi sincronizado com sucesso.", type:"success"}});
        //window.location.reload(false);
      }else{
        //window.alert("Falhou :(");
        this.setState({ snackbar:{open:true, message:"Não foi possível sincronizar o ID da sessão.", type:"error"}});
      }
    }
  }

  render(){
    const { classes } = this.props;
    //console.log("content", this.state.sessionIdDadosAbertos)

    return (
      <Grid container className={classes.body}>
         <CustomizedSnackbars open={this.state.snackbar.open} message={this.state.snackbar.message} type={this.state.snackbar.type}></CustomizedSnackbars>
        <Grid container className={classes.header}>
          <Grid item className={classes.headerTitle}>
            <Typography variant="h3" className={classes.title}>Conteúdos</Typography>
          </Grid>
          <Grid item className={classes.headerMenu}>
  
            {!this.state.sessionIdDadosAbertos &&
              <Button onClick={this.handleSynchronize} className={classes.headerMenuItem}>Sincronizar</Button>
            }
              <Typography variant="h5" className={classes.headerMenuItem}> Ver Acompanhe </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.firstRow} spacing={2}>
            <Grid item md={7}>
              <Typography variant="h5"> Transmissão </Typography>
              <div className={classes.card}>
                {this.state.sessionInfo.id_session_dados_abertos &&
                  <Youtube sessionIdDadosAbertos={this.state.sessionInfo.id_session_dados_abertos}></Youtube>
                }
                </div> 
            </Grid>
            <Grid item md={5}>
              <Typography variant="h5"> Plenário </Typography>
                <Paper elevation={0} className={classes.card}> 
                  <PlenaryPanel sessionIdDadosAbertos={this.state.sessionIdDadosAbertos}></PlenaryPanel>
                </Paper>
            </Grid>
        </Grid>
        <Grid container className={classes.secondRow}>
          <VideoSnippets sessionId={this.state.sessionId} sessionInfo={this.state.sessionInfo}></VideoSnippets>
        </Grid>
        <Grid container className={classes.thirdRow}>
          <ExternalContentPanel sessionId={this.state.sessionId}></ExternalContentPanel>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(Content)
